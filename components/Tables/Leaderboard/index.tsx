import { TableData } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { sweepstakeServices } from "@/services/sweepstake";
import { Spinner } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const { fetchLeaderboard } = sweepstakeServices();
  const [leaderboardData, setLeaderboardData] = useState<TableProps | null>(
    null
  );
  const params = useParams();

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = async () => {
    try {
      let headers: string[] = [];
      let rows: TableRowData[] = [];
      headers = ["User", "Points"];
      const leaderboard = await fetchLeaderboard(Number(params.id));
      console.log("leaderboard", leaderboard);
      leaderboard.forEach((row) => {
        rows.push({
          cells: [row.user.email, row.points],
        });
      });
      setLeaderboardData({
        headers,
        rows,
      });
    } catch (e) {}
  };
  return leaderboardData ? (
    <div className="w-full">
      <Table headers={leaderboardData.headers} rows={leaderboardData.rows} />
    </div>
  ) : (
    <div className="flex items-center justify-center mt-24">
      <Spinner color="default" size="lg" />
    </div>
  );
}
