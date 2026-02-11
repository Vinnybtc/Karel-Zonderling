import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import {
  generatePostContent,
  SEASON_1_EPISODES,
  CONTENT_TYPES,
  ContentType,
} from "@/lib/content-engine";

export const dynamic = "force-dynamic";

// ─── Helper: Verify admin password ───────────────────────────────

function verifyAdmin(request: NextRequest): boolean {
  const password = request.headers.get("x-admin-password");
  return password === process.env.ADMIN_PASSWORD;
}

// ─── GET: Fetch all scheduled/posted content ─────────────────────

export async function GET(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Onbevoegd" }, { status: 401 });
  }

  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("scheduled_posts")
      .select("*")
      .order("scheduled_for", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[autopilot] Fetch error:", error);
      return NextResponse.json(
        { error: "Kon posts niet ophalen" },
        { status: 500 }
      );
    }

    // Calculate stats
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const postsThisWeek = (data || []).filter(
      (p) =>
        p.status === "posted" && new Date(p.posted_at || p.scheduled_for) >= weekAgo
    ).length;

    const nextScheduled = (data || []).find(
      (p) =>
        (p.status === "queued" || p.status === "approved") &&
        new Date(p.scheduled_for) > now
    );

    // Platform status
    const platformStatus = {
      facebook: !!(process.env.FB_PAGE_ID && process.env.FB_ACCESS_TOKEN),
      instagram: !!(process.env.IG_USER_ID && process.env.IG_ACCESS_TOKEN),
    };

    return NextResponse.json({
      posts: data || [],
      stats: {
        postsThisWeek,
        nextScheduled: nextScheduled?.scheduled_for || null,
        totalQueued: (data || []).filter(
          (p) => p.status === "queued" || p.status === "approved"
        ).length,
        totalPosted: (data || []).filter((p) => p.status === "posted").length,
        totalFailed: (data || []).filter((p) => p.status === "failed").length,
      },
      platformStatus,
      contentTypes: CONTENT_TYPES.map((ct) => ({
        type: ct.type,
        label: ct.label,
      })),
      episodes: SEASON_1_EPISODES.map((ep) => ({
        number: ep.number,
        title: ep.title,
      })),
    });
  } catch (error) {
    console.error("[autopilot] Unexpected GET error:", error);
    return NextResponse.json(
      { error: "Onverwachte fout" },
      { status: 500 }
    );
  }
}

// ─── PATCH: Update a post (approve, edit, reschedule, delete) ────

export async function PATCH(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Onbevoegd" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, action, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is verplicht" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    switch (action) {
      case "approve": {
        const { error } = await supabase
          .from("scheduled_posts")
          .update({ status: "approved" })
          .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Post goedgekeurd" });
      }

      case "edit": {
        const updateFields: Record<string, unknown> = {};
        if (updates.text !== undefined) updateFields.text = updates.text;
        if (updates.hashtags !== undefined)
          updateFields.hashtags = updates.hashtags;
        if (updates.scheduled_for !== undefined)
          updateFields.scheduled_for = updates.scheduled_for;

        if (Object.keys(updateFields).length === 0) {
          return NextResponse.json(
            { error: "Geen velden om bij te werken" },
            { status: 400 }
          );
        }

        const { error } = await supabase
          .from("scheduled_posts")
          .update(updateFields)
          .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Post bijgewerkt" });
      }

      case "reschedule": {
        if (!updates.scheduled_for) {
          return NextResponse.json(
            { error: "scheduled_for is verplicht voor herplannen" },
            { status: 400 }
          );
        }

        const { error } = await supabase
          .from("scheduled_posts")
          .update({ scheduled_for: updates.scheduled_for })
          .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Post herplanned" });
      }

      case "delete": {
        const { error } = await supabase
          .from("scheduled_posts")
          .delete()
          .eq("id", id);

        if (error) throw error;
        return NextResponse.json({ message: "Post verwijderd" });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Onbekende actie. Gebruik: "approve", "edit", "reschedule", of "delete"',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[autopilot] PATCH error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Fout bij bijwerken van post",
      },
      { status: 500 }
    );
  }
}

// ─── POST: Manually trigger content generation ───────────────────

export async function POST(request: NextRequest) {
  if (!verifyAdmin(request)) {
    return NextResponse.json({ error: "Onbevoegd" }, { status: 401 });
  }

  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicApiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY niet geconfigureerd" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { contentType, episodeNumber, scheduledFor } = body;

    // Validate content type
    if (contentType && !CONTENT_TYPES.find((ct) => ct.type === contentType)) {
      return NextResponse.json(
        { error: "Ongeldig content type" },
        { status: 400 }
      );
    }

    // Validate episode
    if (
      episodeNumber &&
      !SEASON_1_EPISODES.find((ep) => ep.number === episodeNumber)
    ) {
      return NextResponse.json(
        { error: "Ongeldig afleveringsnummer" },
        { status: 400 }
      );
    }

    // Use provided values or pick randomly
    const selectedType: ContentType =
      contentType ||
      CONTENT_TYPES[Math.floor(Math.random() * CONTENT_TYPES.length)].type;

    const selectedEpisode =
      SEASON_1_EPISODES.find((ep) => ep.number === episodeNumber) ||
      SEASON_1_EPISODES[
        Math.floor(Math.random() * SEASON_1_EPISODES.length)
      ];

    // Generate content
    const post = await generatePostContent(
      selectedType,
      selectedEpisode,
      anthropicApiKey
    );

    const typeInfo = CONTENT_TYPES.find((ct) => ct.type === selectedType);

    // Calculate default schedule: tomorrow at 9:00 CET
    const defaultSchedule = new Date();
    defaultSchedule.setUTCDate(defaultSchedule.getUTCDate() + 1);
    defaultSchedule.setUTCHours(8, 0, 0, 0);

    const postRecord = {
      content_type: selectedType,
      content_type_label: typeInfo?.label || selectedType,
      episode_number: selectedEpisode.number,
      episode_title: selectedEpisode.title,
      text: post.text,
      hashtags: post.hashtags,
      image_prompt: post.imagePrompt,
      scheduled_for: scheduledFor || defaultSchedule.toISOString(),
      status: "queued",
      platforms: ["facebook", "instagram"],
      created_at: new Date().toISOString(),
    };

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("scheduled_posts")
      .insert(postRecord)
      .select()
      .single();

    if (error) {
      console.error("[autopilot] Insert error:", error);
      return NextResponse.json(
        { error: "Kon post niet opslaan" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Post gegenereerd en ingepland",
      post: data,
    });
  } catch (error) {
    console.error("[autopilot] POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Fout bij genereren van content",
      },
      { status: 500 }
    );
  }
}
