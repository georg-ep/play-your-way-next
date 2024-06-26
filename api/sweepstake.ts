import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { request } from "./client";
import { ListAPIResponse } from "@/interfaces/api/Response";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
export async function apiSweepstakes(filters: string): Promise<Sweepstake[]> {
  try {
    const data: ListAPIResponse = await request(`sweepstakes/?${filters}`);
    return data.results;
  } catch (error) {
    console.error("Error fetching sweepstakes:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function apiSweepstakeDetail(id: number): Promise<Sweepstake> {
  try {
    const data: Sweepstake = await request(`sweepstakes/${id}/`);
    return data;
  } catch (error) {
    console.error("Error fetching sweepstake:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function apiLeaderboard(id: number): Promise<any> {
  try {
    const data: ListAPIResponse = await request(
      `sweepstakes/${id}/leaderboard/`
    );
    return data.results;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}

export async function apiFindPrivateLeague(code: string): Promise<any> {
  try {
    const data = await request(`sweepstakes/private/find/${code}/`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiFetchPrivateLeague(code: string): Promise<any> {
  try {
    const data = await request(`sweepstakes/private/${code}/`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiJoinPrivateLeague(code: string): Promise<any> {
  try {
    const data = await request(`sweepstakes/private/join/${code}/`, {
      method: "PATCH",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function apiMyPrivateLeagues(): Promise<any> {
  try {
    const data: ListAPIResponse = await request(`sweepstakes/private/mine/`);
    return data.results;
  } catch (error) {
    throw error;
  }
}

export async function apiSubmitSelections(
  id: number,
  selections: FullTimeSelection,
  scoreSelections: object = null
) {
  const payload = {
    sweepstake: id,
    selections,
    'score_selections': scoreSelections,
  };
  try {
    await request(`sweepstakes/${id}/enter/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
}
