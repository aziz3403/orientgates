// Server-only Supabase clients.
// Two factories:
//   • createSupabaseAnon()    — public reads with anon key; respects RLS.
//   • createSupabaseAdmin()   — full read/write with service role key; BYPASSES RLS.
//
// Neither must be imported from a client component.
// (If you accidentally do, the service-role function will throw because the
// service role key is not prefixed with NEXT_PUBLIC_.)

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getConfig(): { url: string; anon: string } {
  if (!URL || !ANON) {
    throw new Error(
      "Supabase URL and anon key must be set (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    );
  }
  return { url: URL, anon: ANON };
}

export function createSupabaseAnon(): SupabaseClient {
  const { url, anon } = getConfig();
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createSupabaseAdmin(): SupabaseClient {
  const { url } = getConfig();
  if (!SERVICE_ROLE) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be set on the server for admin writes"
    );
  }
  return createClient(url, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
