const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function fetchWithTimeout(
  endpoint: string,
  timeout = 15000
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Server Error");
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const mediaUrl = (path: string) =>
  path.startsWith("http")
    ? path
    : `${BASE_URL.replace("/api", "")}${path}`;
