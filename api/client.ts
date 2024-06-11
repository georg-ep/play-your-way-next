import { getCookie } from "cookies-next";
export async function request<T>(
  url: string,
  options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
): Promise<T> {
  const BASE_URL =
    "https://e97b-2a02-6b6f-f820-ad00-443d-26d-e564-a48d.ngrok-free.app/api/";
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  };
  if (getCookie("access")) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${getCookie("access")}`,
    };
  }
  try {
    const response = await fetch(BASE_URL + url, options);
    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error('HTTP error');
      (error as any).response = errorData;
      throw error;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
