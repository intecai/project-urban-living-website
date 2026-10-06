# Deploying the Urban Living Website

Public marketing site for Urban Living. Next.js 16 App Router using standalone Node server output for real-time request-time data fetching.

- **Build:** `next build` with `output: "standalone"`, producing `.next/standalone`
- **Runtime:** Node.js standalone server (`node server.js`)
- **Port:** `3000`
- **Data:** Room and location content is fetched from the backend API **at request time** (real-time data).

---

## 1. Request-time Data Architecture

The site uses real-time request-time rendering for rooms and locations.
Data is fetched on demand when pages are requested from the browser.

---

## 2. Build Arguments

| Build arg | Notes |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL of the backend API, including `/api`. No trailing slash. |
| `NEXT_PUBLIC_IMAGE_DOMAIN` | Domain for S3 images. |

Production values:

```env
NEXT_PUBLIC_API_BASE_URL=https://urbanliving.client.intecai.in/api
NEXT_PUBLIC_IMAGE_DOMAIN=https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com
```

---

## 3. Deploying on Coolify / Docker

1. **New Resource -> Application -> Public/Private Repository**, pick `intecai/project-urban-living-website`.
2. **Branch:** `production` for live, `development` for staging.
3. **Build Pack:** Dockerfile. **Base Directory:** `/`.
4. Add the **build arguments** `NEXT_PUBLIC_API_BASE_URL` under **Advanced -> Build Arguments**.
5. **Health check path:** `/`. **Health check port:** `3000`.
6. Assign your domain and enable HTTPS. Production hostname: `https://www.urbanlivings.co.in`.
7. Deploy.

---

## 4. Local Development & Docker

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # produces .next/standalone
npm run lint
```

Docker test:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_BASE_URL="https://urbanliving.client.intecai.in/api" \
  -t urban-living-app .

docker run -d --name urban-living-container -p 3000:3000 urban-living-app

curl http://127.0.0.1:3000/
```