// src/lib/csrf.ts
let csrfToken: string | null = null;
const API = import.meta.env.VITE_API_URL;

export async function getCsrfToken(): Promise<string> {
  if (csrfToken) return csrfToken;

  const res = await fetch(`${API}/api/csrf-token`, {
    credentials: "include",
  });
  const data: { csrfToken: string } = await res.json();

  csrfToken = data.csrfToken;
  return data.csrfToken; // return the locally-typed value, not the outer variable
}

export function invalidateCsrfToken() {
  csrfToken = null;
}