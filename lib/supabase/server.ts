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

function assertConfig(): asserts URL is string {
  if (!URL || !ANON) {
    throw new Error(
      "Supabase URL and anon key must be set (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    );
  }
}

export function createSupabaseAnon(): SupabaseClient {
  assertConfig();
  return createClient(URL!, ANON!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function createSupabaseAdmin(): SupabaseClient {
  assertConfig();
  if (!SERVICE_ROLE) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be set on the server for admin writes"
    );
  }
  return createClient(URL!, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Supabase legacy API keys are JWTs carrying the project ref in their payload.
// A key signed for one project is rejected by another with a bare
// "Invalid API key", which the admin UI shows as an empty dashboard — so we
// detect the cross-project mix-up up front and name both refs instead.
function jwtProjectRef(jwt: string | undefined): string | null {
  if (!jwt) return null;
  const payload = jwt.split(".")[1];
  if (!payload) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof parsed?.ref === "string" ? parsed.ref : null;
  } catch {
    return null;
  }
}

export function supabaseConfigMismatch(): string | null {
  if (!URL || !SERVICE_ROLE) return null;
  const urlRef = new globalThis.URL(URL).hostname.split(".")[0];
  const keyRef = jwtProjectRef(SERVICE_ROLE);
  if (!keyRef || keyRef === urlRef) return null;
  return (
    `SUPABASE_SERVICE_ROLE_KEY belongs to Supabase project "${keyRef}" but ` +
    `NEXT_PUBLIC_SUPABASE_URL points at project "${urlRef}". Update ` +
    `SUPABASE_SERVICE_ROLE_KEY to the service_role key of "${urlRef}" ` +
    `(Supabase dashboard → Settings → API) and redeploy.`
  );
}
