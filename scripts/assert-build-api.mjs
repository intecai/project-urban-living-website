/**
 * Fails the build when the API is unreachable so static export never ships stale JSON fallbacks.
 */
const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
const requireLive =
  process.env.REQUIRE_LIVE_API !== "0" && process.env.REQUIRE_LIVE_API !== "false";

if (!requireLive) {
  console.log("[assert-build-api] Skipped (REQUIRE_LIVE_API=0)");
  process.exit(0);
}

if (!base) {
  console.error("[assert-build-api] NEXT_PUBLIC_API_BASE_URL is not set");
  process.exit(1);
}

const healthUrl = `${base}/health`;
const res = await fetch(healthUrl, { signal: AbortSignal.timeout(15000) });
if (!res.ok) {
  console.error(
    `[assert-build-api] API health check failed: ${res.status} ${healthUrl}`,
  );
  process.exit(1);
}

const roomsUrl = `${base}/rooms?limit=1`;
const roomsRes = await fetch(roomsUrl, { signal: AbortSignal.timeout(15000) });
if (!roomsRes.ok) {
  console.error(
    `[assert-build-api] Rooms API check failed: ${roomsRes.status} ${roomsUrl}`,
  );
  process.exit(1);
}

console.log(`[assert-build-api] OK ${healthUrl}`);