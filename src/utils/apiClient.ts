const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  // Determine base URL: use /api-proxy on browser client to avoid CORS blocking when on localhost
  let url = `${API_BASE_URL}${cleanEndpoint}`;
  if (typeof window !== "undefined" && window.location.origin.includes("localhost")) {
    url = `/api-proxy${cleanEndpoint}`;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      console.error(`API Error [${res.status}] ${res.statusText} for URL: ${url}`);
      return null;
    }

    const data = await res.json();
    return data as T;
  } catch (err) {
    // If proxy failed, fallback to direct URL
    if (url.startsWith("/api-proxy")) {
      try {
        const directUrl = `${API_BASE_URL}${cleanEndpoint}`;
        const directRes = await fetch(directUrl, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
        });
        if (directRes.ok) return (await directRes.json()) as T;
      } catch (e) {
        console.error(`Fetch exception for ${url}:`, err);
      }
    } else {
      console.error(`Fetch exception for ${url}:`, err);
    }
    return null;
  }
}
