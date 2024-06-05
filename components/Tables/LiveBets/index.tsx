import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { format } from "@/utils/format";
import { Chip, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function LiveBetsTable() {
  const [betData, setBetData] = useState<TableProps | null>(null);
  const { fetchMyBets } = betServices();
  const [liveGames, setLiveGames] = useState<object[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://e97b-2a02-6b6f-f820-ad00-443d-26d-e564-a48d.ngrok-free.app:8080/ws/chat/");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data?.live_matches) {
        setLiveGames(data.live_matches);
        console.log(JSON.parse(e.data));
      }
    };
  }, []);

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = async () => {
    let bets: Bet[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    bets = await fetchMyBets();
    headers = ["Date", "You need", "Match", "Amount", "Opponent"];
    headers = ["Home Team", "Away Team", "Score", "Status"];
    liveGames.forEach((game) => {
      rows.push({
        cells: [
          game.home_team.short_name,
          game.away_team.short_name,
          `${game.result.home_score} - ${game.result.away_score}`,
          game.status,
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
