import { useState } from "react";
import Modal from "../Modal";
import { Button, Chip, Input, ThemeColors } from "@nextui-org/react";
import { useUIStore } from "@/stores/ui";
import { acceptBet, placeBet } from "@/api/bet";
import { toast } from "react-toastify";
import { format } from "@/utils/format";
import { ShortTeam } from "@/interfaces/models/Team";
import { useBetStore } from "@/stores/bet";
import { Bet, Outcome } from "@/app/page";
import { userServices } from "@/services/user";

interface ConfirmBetData {
  id: number;
  amount: string;
  bet_type: "TEAM_TO_WIN"; // TODO: add other bet types
  date: string;
  match_name: string;
  outcome: Outcome;
}

export default function ConfirmBetModal() {
  const { modalData, closeModal } = useUIStore();
  const { openBets, setOpenBets } = useBetStore();
  const { fetchUser } = userServices();
  const { id, amount, bet_type, date, match_name, outcome } =
    modalData as ConfirmBetData;
  const handleSubmit = async () => {
    await acceptBet({ id });
    closeModal();
    const bets = openBets?.filter((bet) => bet.id !== id);
    await fetchUser();
    setOpenBets(bets!);
    toast.success("Bet Accepted!");
  };
  return (
    <Modal
      title="Confirm Bet"
      body={
        <div className="flex items-center justify-center flex-col">
          <div>
            {match_name}, {format(date)}
          </div>
          <div className="mt-4">You're betting</div>
          <div className="text-lg font-bold mb-2">
            {outcome.value}
          </div>
          <Chip variant="flat" radius="sm" color={outcome.color}>
            {outcome.label}
          </Chip>
          <div className="mt-2">
            for <span className="font-bold">£{amount}</span>
          </div>
        </div>
      }
      onSubmit={handleSubmit}
    />
  );
}
