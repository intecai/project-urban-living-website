# Deploying the Urban Living Website

Public marketing site. **Fully static** (`output: "export"`): HTML is generated at **build time** and served by **nginx** (no Node at runtime).

- **Build:** `npm run build` → `out/`
- **Runtime:** nginx on port **3000**
- **CMS changes:** Redeploy the website (or trigger Coolify rebuild) after publishing new rooms/locations

---

## Build arguments (required)

| Build arg | Notes |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base including `/api` (used only at **build** to bake content). |
| `NEXT_PUBLIC_IMAGE_DOMAIN` | S3 bucket URL for images. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (prod: `https://www.urbanlivings.co.in`). |
| `REQUIRE_LIVE_API` | Default `1` — build fails if API is unreachable (avoids stale fallbacks). |

Production example:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.urbanlivings.co.in/api
NEXT_PUBLIC_IMAGE_DOMAIN=https://urban-living-bucket.s3.us-east-1.amazonaws.com
NEXT_PUBLIC_SITE_URL=https://www.urbanlivings.co.in
REQUIRE_LIVE_API=1
```

Dev/staging:

```env
NEXT_PUBLIC_API_BASE_URL=https://urbanliving.client.intecai.in/api
NEXT_PUBLIC_IMAGE_DOMAIN=https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com
NEXT_PUBLIC_SITE_URL=https://urbanliving-site.client.intecai.in
```

---

## Coolify

1. Application → `intecai/project-urban-living-website`, branch `production` / `development`.
2. **Dockerfile** build pack, base directory `/`.
3. Set all **build arguments** above under Advanced.
4. Health check: path `/`, port `3000`.
5. **After CMS content changes**, run **Redeploy** so static pages pick up new rooms.

---

## Local

```bash
npm ci
export NEXT_PUBLIC_API_BASE_URL=https://urbanliving.client.intecai.in/api
export NEXT_PUBLIC_IMAGE_DOMAIN=https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com
npm run build
npm start   # serves out/ on :3000
```

---

## Client-side updates

The rooms listing still refreshes filters/search in the browser via the public API. Server-rendered HTML is fixed until the next deploy.