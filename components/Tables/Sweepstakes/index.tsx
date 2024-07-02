import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { format } from "@/utils/format";
import { Button, Chip, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShortMatch } from "@/interfaces/models/Match";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import { useUserStore } from "@/stores/user";
import { useUIStore } from "@/stores/ui";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { IoIosFootball } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";
import SweepstakeList from "@/components/Lists/Sweepstake";

export interface Sweepstake {
  matches: ShortMatch[];
  participants: number;
  entry_cost: number;
  start_date: string;
  end_date: string;
  is_paid?: boolean;
  type: {
    label: string;
    color: string;
  };
  id: number;
  name: string;
  status: string;
  winner_selections?: FullTimeSelection[];
  scorer_selections?: any[];
  score_selections?: any[];
  has_entered?: boolean;
}

export default function SweepstakesTable() {
  const [tableData, setTableData] = useState<TableProps | null>(null);
  const { fetchSweepstakes } = sweepstakeServices();
  const { user } = useUserStore();
  const { sweepstakes } = useSweepstakeStore();
  const { openModal } = useUIStore();
  const [selectedTab, setSelectedTab] = useState<Key>("upcoming");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    updateTable();
  }, [user, selectedTab]);

  const updateTable = async () => {
    setLoading(true)
    let _sweepstakes: Sweepstake[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    _sweepstakes = await fetchSweepstakes(true, `status=${selectedTab}`);
    headers = ["Type", "Start", "Name", "Entry", "Participants"];
    _sweepstakes.forEach((sstake) => {
      rows.push({
        cells: [
          <Chip
            className="max-sm:p-1 max-sm:text-xs"
            key={sstake.id}
            color={sstake.type?.color ?? 'default'}
          >
            {sstake.type?.label ?? 'Unknown'}
          </Chip>,
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
    setLoading(false);
  };

  return tableData ? (
    <div className="flex flex-col gap-4">
      <Tabs onSelectionChange={(e) => setSelectedTab(e)} variant="underlined">
        <Tab title="Upcoming" key="upcoming" />
        <Tab title="Underway" key="underway" />
        <Tab title="Completed" key="completed" />
      </Tabs>
      {!loading && <SweepstakeList
        sweepstakes={sweepstakes}
        user={user}
        type={selectedTab}
        openModal={openModal}
      />}
      {loading && <Spinner color="default" />}
    </div>
  ) : (
    <div className="flex items-center justify-center mt-24">
      <Spinner color="default" size="lg" />
    </div>
  );
}
