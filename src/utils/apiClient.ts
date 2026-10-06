const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://urbanliving.client.intecai.in/api";

const isServer = typeof window === "undefined";
const REQUEST_TIMEOUT_MS = 20000;
const GET_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  const method = (options?.method ?? "GET").toUpperCase();
  const isGet = method === "GET";

  // Enforce request-time fetching on the server without build-time caching
  const cacheOptions: RequestInit = isServer && isGet ? { cache: "no-store" } : {};

  const attempts = isGet ? GET_ATTEMPTS : 1;
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const res = await fetch(url, {
        ...options,
        ...cacheOptions,
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} ${res.statusText}`);
        if (res.status < 500) {
          console.error(`API Error [${res.status}] ${res.statusText} for URL: ${url}`);
          return null;
        }
      } else {
        return (await res.json()) as T;
      }
    } catch (err) {
      lastError = err;
    }

    if (attempt < attempts) {
      const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
      console.warn(
        `Request to ${url} failed (attempt ${attempt}/${attempts}), retrying in ${delay}ms.`
      );
      await sleep(delay);
    }
  }

  console.error(`Fetch failed for ${url}:`, lastError);
  return null;
}