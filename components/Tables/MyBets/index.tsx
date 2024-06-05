import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { format } from "@/utils/format";
import { Chip, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function MyBetsTable() {
  const [betData, setBetData] = useState<TableProps | null>(null);
  const { fetchMyBets } = betServices();

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = async () => {
    let bets: Bet[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    bets = await fetchMyBets();
    headers = ["Date", "You need", "Match", "Amount", "Opponent"];
    bets!.forEach((bet: Bet, index: number) => {
      console.log(bet.opponent);
      rows.push({
        cells: [
          format(bet.date),
          <div
            key={`outcome_${index}`}
            className="flex justify-between items-center gap-2"
          >
            <div>{bet.outcome!.value}</div>
            <Chip
              color={bet.outcome!.color}
              variant="flat"
              size="sm"
              radius="sm"
            >
              {bet.outcome!.label}
            </Chip>
          </div>,
          bet.match_name,
          `£${bet.amount}`,
          bet.opponent?.username,
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
