const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}