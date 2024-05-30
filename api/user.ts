import { request } from "./client";
import { User, useUserStore } from "@/stores/user";
import { setCookie, getCookie } from "cookies-next";
import { LoginData, RegisterData } from "@/services/user";

interface TokenResponse {
  access: string;
  refresh: string;
}

export async function apiLogin({
  email,
  password,
}: LoginData): Promise<TokenResponse> {
  try {
    const data: TokenResponse = await request("users/auth/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return data;
  } catch (error) {
    throw new Error("Error fetching user");
  }
}

export async function apiRegister({
  username,
  email,
  password,
}: RegisterData): Promise<TokenResponse> {
  try {
    const data: TokenResponse = await request("users/register/", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    return data;
  } catch (error) {
    throw new Error("Error fetching user");
  }
}

export async function apiFetchUser(): Promise<User> {
  const access = getCookie("access");
  if (!access) throw new Error("No access token");
  try {
    const data: User = await request("users/detail/");
    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
}
