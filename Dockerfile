FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* values are inlined into the client bundle at build time.
# Declare as ARG so it can be supplied as a Docker/Coolify build argument.
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Set to "true" in CI/production to make the build FAIL if the API cannot be
# reached, instead of silently publishing the sample data in src/data/rooms.json.
ARG REQUIRE_LIVE_API=false
ENV REQUIRE_LIVE_API=$REQUIRE_LIVE_API

RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# Pinned so container starts never depend on the npm registry.
RUN npm install -g serve@14.2.6 --no-audit --no-fund

COPY --from=builder /app/out ./out
COPY --from=builder /app/serve.json ./out/serve.json

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs
USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ > /dev/null || exit 1

CMD ["serve", "out", "--listen", "3000", "--no-clipboard"]