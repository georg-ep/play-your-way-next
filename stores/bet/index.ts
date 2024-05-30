import { Bet } from "@/app/page";
import { create } from "zustand";

interface BetState {
  openBets: Bet[] | null;
  myBets: Bet[] | null;
  setMyBets: (myBets: Bet[]) => void;
  setOpenBets: (openBets: Bet[]) => void;
}

export const useBetStore = create<BetState>((set) => ({
  myBets: null,
  openBets: null,
  setMyBets: (myBets: Bet[]) => set({ myBets }),
  setOpenBets: (openBets: Bet[]) => set({ openBets }),
}));
