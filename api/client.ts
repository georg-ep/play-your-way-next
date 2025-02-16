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
  let BASE_URL;
  if (window.location.hostname === "localhost") {
    BASE_URL = "http://localhost:8000/api/";
  } else {
    BASE_URL = "https://play-your-way.co.uk/api/";
  }
  options.headers = {
    ...options.headers,
    "Content-Type": "application/json",
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
      const error = new Error("HTTP error");
      (error as any).response = errorData;
      throw error;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
