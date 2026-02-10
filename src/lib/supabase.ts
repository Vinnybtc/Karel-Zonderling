import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy-initialized server client (only created when actually called)
export function createServerClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase is niet geconfigureerd. Stel NEXT_PUBLIC_SUPABASE_URL en SUPABASE_SERVICE_ROLE_KEY in.");
  }

  return createClient(url, serviceKey);
}
