import FAQFullTimeResult from "@/components/FAQ/FullTimeResult";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { format } from "@/utils/format";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function SweepstakeHeader() {
  const { currentSweepstake: sweepstake, privateLeague } = useSweepstakeStore();

  const path = usePathname();

  const isLeague = () => {
    return path.includes("league");
  };

  const name = () => {
    return isLeague() ? privateLeague?.name : sweepstake?.name;
  };

  const status = () => {
    const status = isLeague()
      ? privateLeague?.sweepstake?.status
      : sweepstake?.status;
    return {
      name:
        status === "IN_PROGRESS"
          ? "In Progress"
          : status === "NOT_STARTED"
          ? "Not Started"
          : "Finished",
      color:
        status === "IN_PROGRESS"
          ? "warning"
          : status === "NOT_STARTED"
          ? "primary"
          : "success",
    };
  };

  return (
    <Card className={`mb-4 bg-transparent p-4 border-t border-${status().color}`}>
      {name() && sweepstake ? (
        <CardHeader className="flex flex-col relative">
          <div
            className={`relative flex top-[-28px] text-default-600 justify-center text-sm border-l border-b border-r rounded-sm py-1 px-2  border-${
              status().color
            }`}
          >
            <div>{status().name}</div>
          </div>
          <div className="w-full text-center">
            <div>
              <p className="text-[32px] text-center font-bold">{name()}</p>
              {isLeague() && (
                <Chip variant="solid" color="primary" className='mt-2 mb-3'>
                  Code: {privateLeague.code}
                </Chip>
              )}
              <p className="text-md mb-8 text-center text-default-600">
                {format(sweepstake.start_date)} - {format(sweepstake.end_date)}
              </p>
              <div className="my-2 flex flex-wrap justify-center gap-2">
                <Chip variant="dot" color="success">
                  {sweepstake.matches.length} matches to predict
                </Chip>
                <Chip variant="dot" color="default">
                  {sweepstake.participants} participants
                </Chip>
                <Chip variant="dot" color="danger">
                  £{sweepstake.participants * sweepstake.entry_cost}.00 pot
                </Chip>
              </div>
            </div>
          </div>
        </CardHeader>
      ) : (
        <Spinner size="lg" className="my-5" color="default" />
      )}
      <CardBody>
        {/* <FAQFullTimeResult /> */}
      </CardBody>
    </Card>
  );
}
