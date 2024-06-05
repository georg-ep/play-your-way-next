import { useSweepstakeStore } from "@/stores/sweepstake";
import {
  apiLeaderboard,
  apiSubmitSelections,
  apiSweepstakeDetail,
  apiSweepstakes,
} from "@/api/sweepstake";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";

export const sweepstakeServices = () => {
  const { sweepstakes, setSweepstakes, setSweepstake, leaderboard, setLeaderboard } = useSweepstakeStore();

  const fetchSweepstakes = async (): Promise<Sweepstake[]> => {
    try {
      let _sweepstakes = sweepstakes;
      if (!_sweepstakes) {
        _sweepstakes = await apiSweepstakes();
        setSweepstakes(_sweepstakes);
      }
      return _sweepstakes;
    } catch (e) {
      throw new Error("Error fetching open bets");
    }
  };

  const fetchLeaderboard = async (id: number): Promise<any> => {
    try {
      let _leaderboard = leaderboard;
      if (!_leaderboard) {
        _leaderboard = await apiLeaderboard(id);
        setLeaderboard(_leaderboard);
      }
      return _leaderboard;
    } catch (e) {
      throw new Error("Error fetching open bets");
    }
  };

  const submitSelections = async (
    id: number,
    selections: FullTimeSelection
  ) => {
    try {
      return await apiSubmitSelections(id, selections);
    } catch (e) {
      throw new Error("Error submitting selections");
    }
  };

  const fetchSweepstakeDetail = async (id: number): Promise<Sweepstake> => {
    try {
      const sweepstake: Sweepstake = await apiSweepstakeDetail(id);
      setSweepstake(sweepstake);
      return sweepstake;
    } catch (e) {
      throw new Error("Error fetching sweepstake detail");
    }
  };

  return {
    fetchSweepstakes,
    fetchSweepstakeDetail,
    submitSelections,
    fetchLeaderboard,
  };
};
