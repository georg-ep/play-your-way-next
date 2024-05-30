"use client";
import AuthModal from "./Auth";
import ConfirmBetModal from "./ConfirmBet";
import DepositModal from "./Deposit";
import PlaceBetModal from "./PlaceBet";
import { useUIStore } from "@/stores/ui";

export default function Modals() {
  const { modalType, isModalOpen } = useUIStore();
  switch (modalType) {
    case "auth":
      return <AuthModal />;
    case "place-bet":
      return <PlaceBetModal />;
    case "deposit":
      return <DepositModal />;
    case "confirm-bet":
      return <ConfirmBetModal />
  }
}
