/** Shared env resolution — avoids silently pointing production at dev buckets/APIs. */

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (configured) {
    return trimTrailingSlashes(configured);
  }
  if (process.env.NODE_ENV === "production") {
    return "https://api.urbanlivings.co.in/api";
  }
  return "https://urbanliving.client.intecai.in/api";
}

export function getImageDomain(): string {
  const configured = process.env.NEXT_PUBLIC_IMAGE_DOMAIN?.trim();
  if (configured) {
    return trimTrailingSlashes(
      configured.startsWith("http") ? configured : `https://${configured}`,
    );
  }
  if (process.env.NODE_ENV === "production") {
    return "https://urban-living-bucket.s3.us-east-1.amazonaws.com";
  }
  return "https://dev-urban-living-bucket.s3.us-east-1.amazonaws.com";
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return trimTrailingSlashes(configured);
  }
  if (process.env.NODE_ENV === "production") {
    return "https://urbanlivings.co.in";
  }
  return "https://urbanliving-site.client.intecai.in";
}