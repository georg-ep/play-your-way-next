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
    "Access-Control-Allow-Origin": "*",
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
      throw new Error(`HTTP error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw new Error(`HTTP error ${error}`);
  }
}
