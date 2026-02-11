import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import {
  generatePostContent,
  pickWeekOfContent,
  CONTENT_TYPES,
} from "@/lib/content-engine";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Cron endpoint: Generate a week of social media content.
 * Runs every Monday at 6AM UTC via Vercel Cron.
 * Protected by CRON_SECRET header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this as Authorization header)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Niet geautoriseerd" },
      { status: 401 }
    );
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY niet geconfigureerd" },
      { status: 500 }
    );
  }

  try {
    const supabase = createServerClient();

    // Fetch recent posts to avoid repeats
    const { data: recentPosts, error: fetchError } = await supabase
      .from("scheduled_posts")
      .select("content_type")
      .order("created_at", { ascending: false })
      .limit(14);

    if (fetchError) {
      console.error("[cron/generate] Supabase fetch error:", fetchError);
      return NextResponse.json(
        { error: "Kon recente posts niet ophalen" },
        { status: 500 }
      );
    }

    const recentTypes = (recentPosts || []).map(
      (p: { content_type: string }) => p.content_type
    );

    // Pick 7 content combinations for the week
    const picks = pickWeekOfContent(recentTypes);

    // Calculate schedule dates: spread across the week
    // Starting from next day, alternating 9:00 and 17:00 CET (8:00 and 16:00 UTC)
    const now = new Date();
    const scheduleStart = new Date(now);
    scheduleStart.setUTCDate(scheduleStart.getUTCDate() + 1); // Start tomorrow
    scheduleStart.setUTCHours(8, 0, 0, 0); // 8:00 UTC = 9:00 CET

    const generatedPosts = [];

    for (let i = 0; i < picks.length; i++) {
      const { contentType, episode } = picks[i];

      try {
        // Generate content via Claude
        const post = await generatePostContent(
          contentType,
          episode,
          anthropicApiKey
        );

        // Calculate scheduled time: alternate between 9:00 and 17:00 CET
        const scheduledFor = new Date(scheduleStart);
        scheduledFor.setUTCDate(scheduleStart.getUTCDate() + Math.floor(i / 1));

        // Day offset: i=0 -> day 0, i=1 -> day 1, ... i=6 -> day 6
        const dayOffset = i;
        scheduledFor.setUTCDate(scheduleStart.getUTCDate() + dayOffset);

        // Alternate times: even index = 9:00 CET (8 UTC), odd index = 17:00 CET (16 UTC)
        if (i % 2 === 0) {
          scheduledFor.setUTCHours(8, 0, 0, 0);
        } else {
          scheduledFor.setUTCHours(16, 0, 0, 0);
        }

        const typeInfo = CONTENT_TYPES.find((ct) => ct.type === contentType);

        const postRecord = {
          content_type: contentType,
          content_type_label: typeInfo?.label || contentType,
          episode_number: episode.number,
          episode_title: episode.title,
          text: post.text,
          hashtags: post.hashtags,
          image_prompt: post.imagePrompt,
          scheduled_for: scheduledFor.toISOString(),
          status: "queued",
          platforms: ["facebook", "instagram"],
          created_at: new Date().toISOString(),
        };

        // Store in Supabase
        const { error: insertError } = await supabase
          .from("scheduled_posts")
          .insert(postRecord);

        if (insertError) {
          console.error(
            `[cron/generate] Insert error for post ${i}:`,
            insertError
          );
          generatedPosts.push({
            index: i,
            status: "error",
            error: insertError.message,
          });
        } else {
          generatedPosts.push({
            index: i,
            status: "ok",
            contentType,
            episode: episode.title,
            scheduledFor: scheduledFor.toISOString(),
          });
        }
      } catch (genError) {
        console.error(
          `[cron/generate] Generation error for post ${i}:`,
          genError
        );
        generatedPosts.push({
          index: i,
          status: "error",
          error:
            genError instanceof Error
              ? genError.message
              : "Generatie mislukt",
        });
      }
    }

    const successCount = generatedPosts.filter(
      (p) => p.status === "ok"
    ).length;
    const failCount = generatedPosts.filter(
      (p) => p.status === "error"
    ).length;

    return NextResponse.json({
      message: `${successCount} posts gegenereerd, ${failCount} mislukt`,
      posts: generatedPosts,
    });
  } catch (error) {
    console.error("[cron/generate] Unexpected error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Onverwachte fout bij generatie",
      },
      { status: 500 }
    );
  }
}
