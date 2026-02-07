import { cookies } from "next/headers";

export async function adminFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin-token")?.value;

  if (!token) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  // Don't set Content-Type for FormData (let browser set it with boundary)
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  // Only set Content-Type to application/json if body is not FormData
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    }
  );
}
