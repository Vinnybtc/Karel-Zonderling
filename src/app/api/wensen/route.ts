import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// GET all wishes (admin only)
export async function GET(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Onbevoegd" }, { status: 401 });
  }

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("wensen")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json({ error: "Kon wensen niet ophalen" }, { status: 500 });
  }

  return NextResponse.json({ wensen: data });
}
