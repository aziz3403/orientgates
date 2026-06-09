// Minimal in-memory sliding-window rate limiter for API routes.
//
// Note: state lives in the process. On serverless hosts each instance keeps
// its own counters and they reset on cold start, so this is burst protection
// (brute force, form spam), not a hard global quota. If stronger guarantees
// are ever needed, swap the Map for Upstash/Redis behind the same interface.

const buckets = new Map<string, number[]>();
const MAX_KEYS = 10_000;

/** Returns true if the call is allowed, false if the key is over its limit. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  let stamps = buckets.get(key);
  if (!stamps) {
    if (buckets.size >= MAX_KEYS) buckets.clear(); // crude memory guard
    stamps = [];
    buckets.set(key, stamps);
  }
  while (stamps.length > 0 && now - stamps[0] > windowMs) stamps.shift();
  if (stamps.length >= limit) return false;
  stamps.push(now);
  return true;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(req: { headers: { get(name: string): string | null } }): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
