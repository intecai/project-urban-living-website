/** Shared env resolution — defaults to production so missing env variables never accidentally point to dev buckets/APIs. */

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (configured) {
    return trimTrailingSlashes(configured);
  }
  // Default to production API when env is missing
  return "https://api.urbanlivings.co.in/api";
}

export function getImageDomain(): string {
  const configured = process.env.NEXT_PUBLIC_IMAGE_DOMAIN?.trim();
  if (configured) {
    return trimTrailingSlashes(
      configured.startsWith("http") ? configured : `https://${configured}`,
    );
  }
  // Default to production bucket when env is missing
  return "https://urban-living-bucket.s3.us-east-1.amazonaws.com";
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return trimTrailingSlashes(configured);
  }
  // Default to production site URL when env is missing
  return "https://urbanlivings.co.in";
}
