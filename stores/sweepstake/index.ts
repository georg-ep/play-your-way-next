import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { create } from "zustand";

interface SweepstakeState {
  sweepstakes: Sweepstake[] | null;
  currentSweepstake: Sweepstake | null;
  leaderboard: any[] | null;
  setLeaderboard: (leaderboard: any[]) => void;
  setSweepstake: (sweepstake: Sweepstake) => void;
  setSweepstakes: (sweepstakes: Sweepstake[]) => void;
}

export const useSweepstakeStore = create<SweepstakeState>((set) => ({
  sweepstakes: null,
  currentSweepstake: null,
  leaderboard: null,
  setLeaderboard: (leaderboard: any[]) => set({ leaderboard }),
  setSweepstake: (sweepstake: Sweepstake) => set({ currentSweepstake: sweepstake }),
  setSweepstakes: (sweepstakes: Sweepstake[]) => set({ sweepstakes }),
}));
