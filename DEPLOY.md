# Deploying the Urban Living Website

Public marketing site for Urban Living. Next.js 16 App Router, built to a static
export and served as plain files.

- **Build:** `next build` with `output: "export"`, producing `out/`
- **Runtime:** static files served by `serve@14.2.6` (pinned)
- **Port:** `3000`
- **Data:** room and location content is fetched from the backend **at build
  time**, then baked into the HTML

---

## 1. Important: this is a build-time snapshot

The site is a static export. Room listings and room detail pages are rendered
during `next build` and frozen into the HTML.

**A new room added through the CMS will not appear on this site until you
redeploy.** Rebuilding is the only way to publish content changes.

Filtering, sorting and pagination still work live, because `RoomsSection` is a
client component that re-queries the backend API from the browser after the page
loads. Only the initial HTML snapshot is stale.

---

## 2. Build argument

| Build arg | Notes |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API, including `/api`. No trailing slash. |
| `REQUIRE_LIVE_API` | Set to `true` in production. Makes the build fail if the API is unreachable instead of publishing sample data. |

Production values:

```
NEXT_PUBLIC_API_BASE_URL=https://api.urbanlivings.co.in/api
REQUIRE_LIVE_API=true
```

> **`NEXT_PUBLIC_*` values are inlined into the client bundle at build time.**
> Set this as a Docker **build argument**, not a runtime environment variable.
> A runtime value will be silently ignored by an already-built image.

Because the build calls this URL, **the backend must be up and reachable before
you build this site.** If it is not, the build still succeeds but falls back to
the sample data in `src/data/rooms.json`, producing a site full of placeholder
rooms such as `room-001`. Always confirm the backend is healthy first.

Set `REQUIRE_LIVE_API=true` in CI and production so this fails the build instead
of publishing placeholder content. Verified behaviour:

```
$ docker build --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.urbanlivings.co.in/api \
    --build-arg REQUIRE_LIVE_API=true .
ERROR: failed to solve: process "/bin/sh -c npm run build" did not complete successfully: exit code: 1
# REQUIRE_LIVE_API is set but the API request to https://api.urbanlivings.co.in/api/rooms failed.
```

The guard only applies during the build (`typeof window === "undefined"`), so
client-side filtering is unaffected and still degrades gracefully at runtime.

---

## 3. Deploying on Coolify

1. **New Resource -> Application -> Public/Private Repository**, pick
   `intecai/project-urban-living-website`.
2. **Branch:** `production` for live, `development` for staging.
3. **Build Pack:** Dockerfile. **Base Directory:** `/`.
4. Add the **build arguments** `NEXT_PUBLIC_API_BASE_URL` and
   `REQUIRE_LIVE_API` under **Advanced -> Build Arguments**.
5. **Health check path:** `/`. **Health check port:** `3000`.
6. Assign your domain and enable HTTPS. Production hostname:
   `https://www.urbanlivings.co.in`.
7. Deploy.

There are no runtime environment variables for this app. Coolify will keep the
container running off the static `out/` directory.

### Deploy order

Deploy the backend **before** the website so the build can reach the API.

### Redeploying to publish CMS content

After adding rooms through the CMS, trigger a new deploy (Coolify: **Redeploy**,
or push a commit to the watched branch) so the static site is rebuilt with the
new data.

---

## 4. Local development

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # produces out/
npm run lint
```

The dev server calls the backend directly. Point it somewhere reachable:

```bash
NEXT_PUBLIC_API_BASE_URL="https://urbanliving.client.intecai.in/api" npm run dev
```

If the API is unreachable the dev server still works, using the fallback data in
`src/data/rooms.json`.

---

## 5. Local Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL="https://urbanliving.client.intecai.in/api" \
  -t ul-website .

docker run -d --name ul-website -p 3000:3000 ul-website

curl http://127.0.0.1:3000/
```

Useful checks once it is running:

```bash
curl -s http://127.0.0.1:3000/rooms | grep -oE '[0-9]+ Rooms Available'
docker exec ul-website ls /app/out/rooms/*.html
```

If the room count reads `0`, or `/app/out/rooms/` contains `room-001.html`
rather than real room slugs, the build could not reach the backend and fell back
to sample data.

---

## 6. Routing and configuration notes

- `next.config.ts` sets `output: "export"`. `rewrites()` is not supported with a
  static export and will fail the build.
- `src/app/rooms/[slug]/page.tsx` sets `dynamicParams = false`, so only room
  slugs known at build time resolve. Unknown slugs return 404. This is required
  for static export.
- `images.unoptimized` is enabled, since the default image optimizer needs a
  Node server.
- `serve.json` disables directory listing and enables clean URLs, so `/contact`
  serves `contact.html`.
- `Dockerfile` pins `serve@14.2.6` so container starts never depend on the npm
  registry.