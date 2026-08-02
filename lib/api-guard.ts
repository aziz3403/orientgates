import { NextResponse } from "next/server";

// Wrap a route handler so any uncaught throw (eg a missing env var making
// createSupabaseAdmin() throw) still returns JSON. Without this, Vercel
// serves a plain-text 500 page and Safari surfaces it to the admin UI as
// the cryptic "The string did not match the expected pattern".
export function guarded<A extends unknown[]>(
  handler: (...args: A) => Promise<Response>
): (...args: A) => Promise<Response> {
  return async (...args: A) => {
    try {
      return await handler(...args);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Internal server error";
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  };
}
