import { ListAPIResponse } from "@/interfaces/api/Response";
import { request } from "./client";
import { Bet } from "@/app/page";

export async function placeBet(body: BodyInit) {
  try {
    const data = await request("bets/create/", { method: "POST", body });
    return data;
  } catch (error) {
    console.error("Error placing bet:", error);
    throw error;
  }
}

export async function acceptBet({ id }: { id: number }) {
  try {
    const data = await request(`bets/accept/${id}/`, { method: "PATCH" });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function apiOpenBets(): Promise<Bet[]> {
  try {
    const data: ListAPIResponse = await request("bets/open/");
    return data.results;
  } catch (error: any) {
    console.log("Error fetching open bets:", error);
    throw new Error(error);
  }
}

export async function apiMyBets(): Promise<Bet[]> {
  try {
    const data: ListAPIResponse = await request("bets/mine/");
    return data.results;
  } catch (error: any) {
    console.log("Error fetching my bets:", error);
    throw new Error(error);
  }
}
