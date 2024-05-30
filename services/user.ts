import { User, useUserStore } from "@/stores/user";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { apiFetchUser, apiLogin, apiRegister } from "@/api/user";
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
}

export const userServices = () => {
    const { setUser, setLoading } = useUserStore();

    const login = async ({ email, password }: LoginData) => {
      const tokens = await apiLogin({ email, password });
      setCookie("access", tokens.access);
      setCookie("refresh", tokens.refresh);
      await fetchUser();
    };
    
    const register = async ({ username, email, password }: RegisterData) => {
      const tokens = await apiRegister({username, email, password});
      setCookie("access", tokens.access);
      setCookie("refresh", tokens.refresh);
      await fetchUser();
    };
    
    const fetchUser = async () => {
      if (!getCookie('access')) return;
      setLoading(true);
      const user: User = await apiFetchUser();
      setUser(user);
      setTimeout(() => setLoading(false), 100000);
    };
    
    const logout = () => {
      deleteCookie("access");
      deleteCookie("refresh");
      setUser(null);
    };

    return { login, fetchUser, logout, register };
}

