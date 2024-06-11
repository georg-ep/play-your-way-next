import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { request } from "./client";
import { ListAPIResponse } from "@/interfaces/api/Response";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
export async function apiSweepstakes(): Promise<Sweepstake[]> {
  try {
    const data: ListAPIResponse = await request("sweepstakes/");
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
    const data: ListAPIResponse = await request(`sweepstakes/${id}/leaderboard/`);
    return data.results;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
}

export async function apiSubmitSelections(id: number, selections: FullTimeSelection) {
  const payload = {
    sweepstake: id,
    selections
  }
  try {
    await request(`sweepstakes/${id}/enter/`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw error;
  }
}
