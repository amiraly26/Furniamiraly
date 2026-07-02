type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

// Shared fetch helper for the frontend. It normalizes Payload responses so pages can read `data`.
export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    // Product and review pages should show fresh CMS data unless a page asks for caching.
    ...(method === "GET" && !next && { cache: "no-store" as RequestCache }),
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json") && response.ok) {
      const json = await response.json();

      // Payload list endpoints return `docs`; the frontend expects the same list in `data`.
      if (Array.isArray(json.docs)) {
        return { ...json, data: json.docs };
      }

      if (json && !("data" in json)) {
        return { data: json };
      }

      return json;
    } else {
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    console.error(`Error ${method} data:`, error);
    return { data: [], error };
  }
}
