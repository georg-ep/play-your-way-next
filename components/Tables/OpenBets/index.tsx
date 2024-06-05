import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { useUIStore } from "@/stores/ui";
import { useUserStore } from "@/stores/user";
import { format } from "@/utils/format";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OpenBetsTable() {
  const [betData, setBetData] = useState<TableProps | null>(null);
  const { fetchOpenBets } = betServices();
  const { openModal } = useUIStore();
  const { user } = useUserStore();

  useEffect(() => {
    setTableData();
  }, []);

  const acceptBet = (bet: Bet) => {
    if (parseFloat(user!.credits) < parseFloat(bet.amount)) {
      toast.error("Not enough balance");
      return openModal("deposit");
    } else {
      openModal("confirm-bet", bet);
    }
  };

  const setTableData = async () => {
    let bets: Bet[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    bets = await fetchOpenBets();
    headers = ["Date", "You need", "Match", "Amount", "Actions"];
    bets!.forEach((bet: Bet, index: number) => {
      rows.push({
        cells: [
          format(bet.date),
          <div
            key={`outcome_${index}`}
            className="flex justify-between items-center gap-2"
          >
            <div>{bet.outcome!.value}</div>
            <Chip color={bet.outcome!.color} size="sm" radius="sm">
              {bet.outcome!.label}
            </Chip>
          </div>,
          bet.match_name,
          `£${bet.amount}`,
          <Button
            onClick={() => acceptBet(bet)}
            size="sm"
            key={`button_${index}`}
            variant="flat"
            color="primary"
          >
            Accept
          </Button>,
        ],
      });
    });
    setBetData({
      headers,
      rows,
    });
  };

  return betData ? (
    <Table headers={betData.headers} rows={betData.rows} />
  ) : (
    <div className="flex items-center justify-center mt-24">
      <Spinner color="default" size="lg" />
    </div>
  );
}
