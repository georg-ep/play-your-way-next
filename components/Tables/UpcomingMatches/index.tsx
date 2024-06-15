import { fetchMatches } from "@/api/match";
import { TableData } from "@/app/page";
import Table from "@/components/Table";
import { TableRowData } from "@/interfaces/components/Table";
import { Competition, ShortMatch } from "@/interfaces/models/Match";
import { useUIStore } from "@/stores/ui";
import { useUserStore } from "@/stores/user";
import { format } from "@/utils/format";
import { Button, Chip, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function UpcomingMatchesTable() {
  const [data, setData] = useState<TableData[]>([]);
  const { openModal } = useUIStore();
  const { user } = useUserStore();
  const headers: string[] = ["Home Team", "Away Team", "Date", "Actions"];

  useEffect(() => {
    setTableData();
  }, []);

  const setTableData = async () => {
    const competitions: Competition[] = await fetchMatches();
    const _tableData: TableData[] = [];
    competitions.forEach((competition: Competition) => {
      const _rows: TableRowData[] = [];
      competition.matches.forEach((match: ShortMatch) =>
        _rows.push({
          cells: [
            match.home_team.short_name,
            match.away_team.short_name,
            format(match.utc_date),
            <Button
              key={match.id}
              onPress={() =>
                user
                  ? openModal("place-bet", match)
                  : openModal("auth", { initialType: "login" })
              }
              fullWidth
              size="sm"
              color="primary"
            >
              Create Bet
            </Button>,
          ],
        })
      );
      _tableData.push({ title: competition.name, rows: _rows });
    });
    setData(_tableData);
  };

  return (
    <Tabs variant="underlined">
      {data.map((table) => (
        <Tab key={table.title} title={table.title}>
          <Table rows={table.rows} headers={headers} />
        </Tab>
      ))}
    </Tabs>
  );
}
