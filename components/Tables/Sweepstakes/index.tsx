import { Bet } from "@/app/page";
import Table from "@/components/Table";
import { TableProps, TableRowData } from "@/interfaces/components/Table";
import { betServices } from "@/services/bet";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { format } from "@/utils/format";
import { Button, Chip, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShortMatch } from "@/interfaces/models/Match";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import { useUserStore } from "@/stores/user";
import { useUIStore } from "@/stores/ui";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { IoIosFootball } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaDoorOpen } from "react-icons/fa";

export interface Sweepstake {
  matches: ShortMatch[];
  participants: number;
  entry_cost: number;
  start_date: string;
  end_date: string;
  type: {
    label: string;
    color: string;
  };
  id: number;
  name: string;
  selections: FullTimeSelection[];
  has_entered?: boolean;
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
  }, [user]);

  const updateTable = async () => {
    let _sweepstakes: Sweepstake[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];

    _sweepstakes = await fetchSweepstakes();
    headers = ["Type", "Start", "Name", "Entry", "Participants"];
    _sweepstakes.forEach((sstake) => {
      rows.push({
        cells: [
          <Chip
            className="max-sm:p-1 max-sm:text-xs"
            key={sstake.id}
            color={sstake.type.color}
          >
            {sstake.type.label}
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
  };

  const handleRowClick = (index: number) => {
    if (!user) {
      return openModal("auth", { initialType: "login" });
    }
    router.push(`/sweepstakes/${sweepstakes![index].id}/`);
  };

  return tableData ? (
    // <Table
    //   headers={tableData.headers}
    //   rows={tableData.rows}
    //   onRowClick={(index: number) => handleRowClick(index)}
    // />
    <div className="flex flex-col gap-2">
      {sweepstakes.map((sstake, index) => (
        <div
          key={`ss_${index}`}
          className="border max-sm:border-l-0 max-sm:border-t-0 max-sm:border-r-0 max-sm:border-b-0 border-2 border-default-400 flex w-full justify-between rounded-none md:rounded-lg md:p-4 px-0 py-4"
        >
          <div className="flex flex-col justify-between pr-2 md:pr-4">
            <div>
              <div className="text-lg font-bold">{sstake.name}</div>
              <div className="text-sm text-default-500">
                {format(sstake.start_date)}
              </div>
            </div>
            <Button
              onPress={() => handleRowClick(index)}
              variant="faded"
              className="mt-4 bg-transparent"
              color="warning"
            >
              View Sweepstake
            </Button>
          </div>
          <div className='flex'>
            <div className="max-w-[180px] box-border pl-1 md:pl-2 flex flex-col gap-2 justify-center">
              <Chip
                variant="bordered"
                className='p-3 w-full text-center text-white max-w-none'
                color='secondary'
                startContent={<RiMoneyPoundCircleFill size={20} />}
              >
                {sstake.entry_cost * sstake.participants}.00 Total Pot
              </Chip>
              <Chip
                variant="bordered"
                className='p-3 w-full text-center max-w-none'
                startContent={<IoIosFootball size={20} />}
              >
                <span className="text-white">{sstake.type.label}</span>
              </Chip>
              <Chip
                color="primary"
                className='p-3 w-full text-center max-w-none'
                variant="bordered"
                startContent={<FaPeopleGroup size={20} />}
              >
                <span className="text-white">
                  {sstake.participants} participants
                </span>
              </Chip>
              <Chip
                color="success"
                className='p-3 w-full text-center max-w-none'
                variant="bordered"
                startContent={<FaDoorOpen size={20} />}
              >
                <span className="text-white">£{sstake.entry_cost} entry</span>
              </Chip>
            </div>
            {/* <Chip variant="bordered">In progress</Chip> */}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex items-center justify-center mt-24">
      <Spinner color="default" size="lg" />
    </div>
  );
}
