import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { name, wish } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length < 1) {
      return NextResponse.json({ error: "Naam is verplicht" }, { status: 400 });
    }
    if (!wish || typeof wish !== "string" || wish.trim().length < 3) {
      return NextResponse.json({ error: "Wens is te kort" }, { status: 400 });
    }

    // Rate limit: max 200 chars name, 1000 chars wish
    const safeName = name.trim().slice(0, 200);
    const safeWish = wish.trim().slice(0, 1000);

    const supabase = createServerClient();

    const { error } = await supabase.from("wensen").insert({
      name: safeName,
      wish: safeWish,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Kon de wens niet opslaan. Probeer later opnieuw." },
        { status: 500 }
      );
    }

    // Send push notification via ntfy
    try {
      await fetch("https://ntfy.sh/karel-zonderling-wensen", {
        method: "POST",
        headers: {
          "Title": `Nieuw idee van ${safeName}`,
          "Tags": "bulb,sparkles",
        },
        body: safeWish,
      });
    } catch {
      // Don't fail the request if notification fails
      console.error("Ntfy notification failed");
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer opnieuw." },
      { status: 500 }
    );
  }
}
