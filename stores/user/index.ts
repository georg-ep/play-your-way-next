import { create } from "zustand";

export interface User {
  id: number;
  credits: string;
  test_credits: string;
  email: string;
  first_name?: string;
  last_name?: string;
  uid: string;
  username?: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  user: null,
  isLoggedIn: false,
  setLoading: (loading: boolean) => set({ loading }),
  setUser: (user: User | null) => set({ user }),
  setIsLoggedIn: (isLoggedIn: boolean) => set({isLoggedIn})
}));
