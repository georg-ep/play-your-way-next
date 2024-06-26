import { ListAPIResponse } from "@/interfaces/api/Response";
import { Competition, ShortMatch } from "@/interfaces/models/Match";
import { request } from "./client";
export async function fetchMatches(): Promise<Competition[]> {
  try {
    const data: Competition[] = await request("football/matches/");
    return data; // Assuming the response contains an array of matches
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error; // Propagate the error to the caller
  }
}

export async function apiFetchPlayers(id: number) {
  try {
    const data: ListAPIResponse = await request(`football/match/${id}/players/`)
    return data.results;
  } catch (e) {
    console.log(e);
    throw e;
  }
}