import { TableData } from "@/app/page";
import Table from "@/components/Table";
import {
  TableHeader,
  TableProps,
  TableRowData,
} from "@/interfaces/components/Table";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { Spinner } from "@nextui-org/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const { fetchLeaderboard } = sweepstakeServices();
  const {privateLeague, currentSweepstake} = useSweepstakeStore()
  const [leaderboardData, setLeaderboardData] = useState<TableProps | null>(
    null
  );
  const params = useParams();
  const path = usePathname();

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = async () => {
    try {
      let headers: TableHeader[] = [];
      let rows: TableRowData[] = [];
      headers = [
        { label: "Rank", width: '10%' },
        { label: "User" },
        { label: "Points" },
      ];
      const id = path.includes('league') ? privateLeague?.sweepstake?.id : currentSweepstake.id;
      const leaderboard = await fetchLeaderboard(id);
      leaderboard.items.forEach((row, index) => {
        rows.push({
          styling: `${['bg-success bg-opacity-40', 'bg-success bg-opacity-30', 'bg-success bg-opacity-20'][index]}`,
          cells: [index + 1, row.user.username, row.points],
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
