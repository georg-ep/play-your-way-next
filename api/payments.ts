import { request } from "./client";
export async function processPayment(body: string): Promise<any> {
  try {
    const data = await request("payments/", { method: "POST", body });
    return data;
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error; // Propagate the error to the caller
  }
}
