import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { format } from "@/utils/format";
import { Chip, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShortMatch } from "@/interfaces/models/Match";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import { useUserStore } from "@/stores/user";
import { useUIStore } from "@/stores/ui";

export interface Sweepstake {
  matches: ShortMatch[];
  participants: number;
  entry_cost: number;
  start_date: string;
  type: {
    label: string;
    color: string;
  };
  id: number;
  name: string;
  selections: FullTimeSelection[];
}

export default function SweepstakesTable() {
  const [tableData, setTableData] = useState<TableProps | null>(null);
  const { fetchSweepstakes } = sweepstakeServices();
  const { user } = useUserStore();
  const { sweepstakes } = useSweepstakeStore();
  const { openModal } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    updateTable();
  }, []);

  const updateTable = async () => {
    let _sweepstakes: Sweepstake[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    _sweepstakes = await fetchSweepstakes();
    headers = ["Type", "Start", "Name", "Entry", "Participants"];
    _sweepstakes.forEach((sstake) => {
      rows.push({
        cells: [
          <Chip key={sstake.id} color={sstake.type.color}>{sstake.type.label}</Chip>,
          format(sstake.start_date),
          sstake.name,
          `£${sstake.entry_cost}`,
          sstake.participants,
        ],
      });
    });
    setTableData({
      headers,
      rows,
    });
  };

  const handleRowClick = (index: number) => {
    if (!user) {
      return openModal("auth", { initialType: "login" });
    }
    router.push(`/sweepstakes/${sweepstakes![index].id}/`);
  };

  return tableData ? (
    <Table
      headers={tableData.headers}
      rows={tableData.rows}
      onRowClick={(index: number) => handleRowClick(index)}
    />
  ) : (
    <div className="flex items-center justify-center mt-24">
      <Spinner color="default" size="lg" />
    </div>
  );
}
