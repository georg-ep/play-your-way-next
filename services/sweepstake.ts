import { useSweepstakeStore } from "@/stores/sweepstake";
import {
  apiFindPrivateLeague,
  apiLeaderboard,
  apiSubmitSelections,
  apiSweepstakeDetail,
  apiSweepstakes,
  apiJoinPrivateLeague,
  apiMyPrivateLeagues,
  apiFetchPrivateLeague,
} from "@/api/sweepstake";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";

export const sweepstakeServices = () => {
  const {
    sweepstakes,
    setSweepstakes,
    setSweepstake,
    leaderboard,
    setLeaderboard,
    privateLeagues,
    setPrivateLeagues,
    setPrivateLeague,
    privateLeague,
  } = useSweepstakeStore();

  const fetchSweepstakes = async (force: boolean = false, filters: string = ""): Promise<Sweepstake[]> => {
    try {
      let _sweepstakes = sweepstakes;
      if (!_sweepstakes || force) {
        _sweepstakes = await apiSweepstakes(filters);
        setSweepstakes(_sweepstakes);
      }
      return _sweepstakes;
    } catch (e) {
      throw new Error("Error fetching open bets");
    }
  };

  const fetchLeaderboard = async (
    id: number
  ): Promise<{ id: number; items: any[] }> => {
    try {
      if (leaderboard?.id === id) {
        return leaderboard;
      }
      const items = await apiLeaderboard(id);
      const _leaderboard = { id, items };
      setLeaderboard(_leaderboard);
      return _leaderboard;
    } catch (e) {
      throw new Error("Error fetching leaderboard");
    }
  };

  const findPrivateLeague = async (code: string): Promise<any> => {
    try {
      return await apiFindPrivateLeague(code);
    } catch (e) {
      throw e;
    }
  };

  const myPrivateLeagues = async (): Promise<any> => {
    try {
      let leagues = privateLeagues;
      if (!leagues) {
        const _leagues = await apiMyPrivateLeagues();
        setPrivateLeagues(_leagues);
      }
      return privateLeagues;
    } catch (e) {
      throw e;
    }
  };

  const fetchPrivateLeague = async (code: string): Promise<any> => {
    try {
      setSweepstake(null);
      const league = await apiFetchPrivateLeague(code);
      setPrivateLeague(league);
      return league;
    } catch (e) {
      throw e;
    }
  };

  const joinPrivateLeague = async (code: string): Promise<any> => {
    try {
      return await apiJoinPrivateLeague(code);
    } catch (e) {
      throw e;
    }
  };

  const submitSelections = async (
    id: number,
    selections: FullTimeSelection
  ) => {
    try {
      return await apiSubmitSelections(id, selections);
    } catch (e) {
      throw e;
    }
  };

  const fetchSweepstakeDetail = async (id: number): Promise<Sweepstake> => {
    try {
      setSweepstake(null);
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
    findPrivateLeague,
    joinPrivateLeague,
    myPrivateLeagues,
    fetchPrivateLeague,
  };
};
