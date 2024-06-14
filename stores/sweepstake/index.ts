import { PrivateLeague } from "@/components/Tables/MyLeagues";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { create } from "zustand";

export interface LeaderboardInfo {
  id: number;
  items: any[];
}

interface SweepstakeState {
  sweepstakes: Sweepstake[] | null;
  currentSweepstake: Sweepstake | null;
  leaderboard: LeaderboardInfo | null;
  privateLeagues: PrivateLeague[] | null;
  privateLeague: PrivateLeague | null;
  setPrivateLeagues: (leagues: PrivateLeague[]) => void;
  setPrivateLeague: (league: PrivateLeague) => void;
  setLeaderboard: (props: LeaderboardInfo) => void;
  setSweepstake: (sweepstake: Sweepstake) => void;
  setSweepstakes: (sweepstakes: Sweepstake[]) => void;
}

export const useSweepstakeStore = create<SweepstakeState>((set) => ({
  sweepstakes: null,
  currentSweepstake: null,
  leaderboard: null,
  privateLeagues: null,
  privateLeague: null,
  setPrivateLeague: (league: PrivateLeague) => set({ privateLeague: league }),
  setPrivateLeagues: (leagues: PrivateLeague[]) => set({ privateLeagues: leagues }),
  setLeaderboard: (props: LeaderboardInfo) => set({ leaderboard: props }),
  setSweepstake: (sweepstake: Sweepstake) => set({ currentSweepstake: sweepstake }),
  setSweepstakes: (sweepstakes: Sweepstake[]) => set({ sweepstakes }),
}));
