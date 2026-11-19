import { getApiBaseUrl } from "@/utils/siteConfig";

const API_BASE_URL = getApiBaseUrl();

const isServer = typeof window === "undefined";
const REQUEST_TIMEOUT_MS = 20000;
const GET_ATTEMPTS = 3;
const RETRY_BASE_DELAY_MS = 500;

export interface FetchApiOptions extends RequestInit {
  skipCache?: boolean;
  cacheDurationMs?: number;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// In-memory client-side cache and in-flight request deduplication
const clientMemoryCache = new Map<string, CacheEntry<any>>();
const inFlightRequests = new Map<string, Promise<any>>();

function getCacheDuration(endpoint: string, customDuration?: number): number {
  if (customDuration !== undefined) return customDuration;
  if (endpoint.includes("/settings")) return 5 * 60 * 1000; // 5 mins
  if (endpoint.includes("/locations")) return 5 * 60 * 1000; // 5 mins
  if (endpoint.includes("/rooms")) return 2 * 60 * 1000; // 2 mins
  return 1 * 60 * 1000; // 1 min default
}

export function clearApiCache(endpointPrefix?: string): void {
  if (!endpointPrefix) {
    clientMemoryCache.clear();
    return;
  }
  for (const key of clientMemoryCache.keys()) {
    if (key.includes(endpointPrefix)) {
      clientMemoryCache.delete(key);
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchApi<T>(
  endpoint: string,
  options?: FetchApiOptions
): Promise<T | null> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;
  const method = (options?.method ?? "GET").toUpperCase();
  const isGet = method === "GET";

  // Check client-side cache for GET requests
  const cacheKey = `${method}:${cleanEndpoint}`;
  if (!isServer && isGet && !options?.skipCache) {
    const cached = clientMemoryCache.get(cacheKey);
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data as T;
    }

    // Deduplicate in-flight requests on the client
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey) as Promise<T | null>;
    }
  }

  // Server-side caching configuration with safe revalidation where appropriate
  let cacheOptions: RequestInit = {};
  if (isServer && isGet) {
    if (options?.cache) {
      cacheOptions = { cache: options.cache };
    } else if (options?.next) {
      cacheOptions = { next: options.next };
    } else {
      let revalidateSeconds = 60;
      if (cleanEndpoint.includes("/settings") || cleanEndpoint.includes("/locations")) {
        revalidateSeconds = 300;
      }
      cacheOptions = { next: { revalidate: revalidateSeconds } };
    }
  }

  const executeFetch = async (): Promise<T | null> => {
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
          const data = (await res.json()) as T;
          // Store successful GET response in client memory cache
          if (!isServer && isGet && !options?.skipCache) {
            const ttl = getCacheDuration(cleanEndpoint, options?.cacheDurationMs);
            clientMemoryCache.set(cacheKey, {
              data,
              timestamp: Date.now(),
              expiresAt: Date.now() + ttl,
            });
          }
          return data;
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
  };

  if (!isServer && isGet && !options?.skipCache) {
    const promise = executeFetch();
    inFlightRequests.set(cacheKey, promise);
    try {
      return await promise;
    } finally {
      inFlightRequests.delete(cacheKey);
    }
  }

  return executeFetch();
}
