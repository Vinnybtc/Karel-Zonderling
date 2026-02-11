import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { postToFacebook, postToInstagram } from "@/lib/social";

export const dynamic = "force-dynamic";

/**
 * Cron endpoint: Post scheduled content to social media platforms.
 * Runs twice daily (8AM and 4PM UTC) via Vercel Cron.
 * Protected by CRON_SECRET header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Niet geautoriseerd" },
      { status: 401 }
    );
  }

  try {
    const supabase = createServerClient();
    const now = new Date().toISOString();

    // Fetch posts that are due: status "queued" or "approved", scheduled_for <= now
    const { data: duePosts, error: fetchError } = await supabase
      .from("scheduled_posts")
      .select("*")
      .in("status", ["queued", "approved"])
      .lte("scheduled_for", now)
      .order("scheduled_for", { ascending: true })
      .limit(10);

    if (fetchError) {
      console.error("[cron/post] Supabase fetch error:", fetchError);
      return NextResponse.json(
        { error: "Kon posts niet ophalen" },
        { status: 500 }
      );
    }

    if (!duePosts || duePosts.length === 0) {
      return NextResponse.json({
        message: "Geen posts gepland voor nu",
        posted: 0,
      });
    }

    // Check which platforms are configured
    const fbPageId = process.env.FB_PAGE_ID;
    const fbAccessToken = process.env.FB_ACCESS_TOKEN;
    const igUserId = process.env.IG_USER_ID;
    const igAccessToken = process.env.IG_ACCESS_TOKEN;

    const hasFacebook = !!(fbPageId && fbAccessToken);
    const hasInstagram = !!(igUserId && igAccessToken);

    if (!hasFacebook && !hasInstagram) {
      console.warn(
        "[cron/post] Geen social media platforms geconfigureerd"
      );
      return NextResponse.json({
        message: "Geen platforms geconfigureerd — posts overgeslagen",
        posted: 0,
      });
    }

    const results = [];

    for (const post of duePosts) {
      // Combine text and hashtags
      const fullText = `${post.text}\n\n${(post.hashtags || []).join(" ")}`;
      const imageUrl = post.image_url || null; // May be null if no image generated yet

      const platformResults: Record<string, unknown> = {};
      let anySuccess = false;
      const errors: string[] = [];

      // Post to Facebook (works without image)
      if (hasFacebook) {
        const fbResult = await postToFacebook(
          fbPageId!,
          fbAccessToken!,
          fullText,
          imageUrl || undefined
        );
        platformResults.facebook = fbResult;
        if (fbResult.success) {
          anySuccess = true;
        } else {
          errors.push(`Facebook: ${fbResult.error}`);
        }
      }

      // Post to Instagram (requires image)
      if (hasInstagram && imageUrl) {
        const igResult = await postToInstagram(
          igUserId!,
          igAccessToken!,
          fullText,
          imageUrl
        );
        platformResults.instagram = igResult;
        if (igResult.success) {
          anySuccess = true;
        } else {
          errors.push(`Instagram: ${igResult.error}`);
        }
      } else if (hasInstagram && !imageUrl) {
        platformResults.instagram = {
          success: false,
          error: "Geen afbeelding beschikbaar — Instagram overgeslagen",
        };
      }

      // Update post status in database
      const updateData: Record<string, unknown> = {
        platform_results: platformResults,
        posted_at: anySuccess ? new Date().toISOString() : null,
      };

      if (anySuccess) {
        updateData.status = "posted";
      } else {
        updateData.status = "failed";
        updateData.error_message = errors.join("; ");
      }

      const { error: updateError } = await supabase
        .from("scheduled_posts")
        .update(updateData)
        .eq("id", post.id);

      if (updateError) {
        console.error(
          `[cron/post] Update error for post ${post.id}:`,
          updateError
        );
      }

      results.push({
        id: post.id,
        contentType: post.content_type,
        status: anySuccess ? "posted" : "failed",
        platformResults,
      });
    }

    const postedCount = results.filter((r) => r.status === "posted").length;
    const failedCount = results.filter((r) => r.status === "failed").length;

    return NextResponse.json({
      message: `${postedCount} gepost, ${failedCount} mislukt`,
      posted: postedCount,
      failed: failedCount,
      results,
    });
  } catch (error) {
    console.error("[cron/post] Unexpected error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Onverwachte fout bij posten",
      },
      { status: 500 }
    );
  }
}
