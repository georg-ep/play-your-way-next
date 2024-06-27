import { format } from "@/utils/format";
import { Button, Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaDoorOpen, FaPeopleGroup } from "react-icons/fa6";
import { IoIosFootball } from "react-icons/io";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { MdPeopleAlt } from "react-icons/md";
import { HiStatusOnline } from "react-icons/hi";
import { IoMdTrophy } from "react-icons/io";

export default function SweepstakeList({ sweepstakes, user, openModal, type }) {
  const router = useRouter();

  const status = ({ status, start_date }) => {
    return {
      color:
        status === "IN_PROGRESS"
          ? "warning"
          : status === "FINISHED"
          ? "success"
          : "primary",
      text:
        status === "IN_PROGRESS"
          ? "In Progress"
          : status === "FINISHED"
          ? "Finished"
          : `${format(start_date)}`,
    };
  };

  const handleRowClick = (index: number) => {
    if (!user) {
      return openModal("auth", { initialType: "login" });
    }
    router.push(`/sweepstakes/${sweepstakes![index].id}/`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sweepstakes.map((sstake, index) => (
          <Card
            key={`sweepstake-${index}`}
            className="shadow-lg p-4 rounded-md"
          >
            <CardHeader className="flex flex-col items-start">
              <div className="text-2xl font-bold">{sstake.name}</div>
              <div className="text-sm text-default-500 mt-1 pt-1 border-t border-t-default-400">
                Guess the correct winner from a series of matches and win points
                to take the pot!
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex justify-between w-full">
                <div className="flex items-center">
                  <HiStatusOnline width={16} />{" "}
                  <span className="pl-1 ml-1 border-l border-l-2 border-l-default-300">
                    {sstake.status !== "NOT_STARTED" ? "Status" : "Starts"}
                  </span>
                </div>
                <Chip
                  className="text-center max-w-none px-0 rounded-md"
                  color={status(sstake).color}
                  variant="flat"
                >
                  {status(sstake).text}
                </Chip>
              </div>
              {sstake?.winner && sstake.status !== "NOT_STARTED" && (
                <div className="flex justify-between mt-2 w-full">
                  <div className="flex items-center">
                    <IoMdTrophy width={16} />{" "}
                    <span className="pl-1 ml-1 border-l border-l-2 border-l-default-300">
                      {sstake.status === "IN_PROGRESS" ? "Winning" : "Winner"}
                    </span>
                  </div>
                  <Chip
                    className="text-center max-w-none px-0 rounded-md"
                    color="success"
                    variant="bordered"
                  >
                    {sstake.winner}
                  </Chip>
                </div>
              )}
              <div className="flex justify-between w-full mt-2">
                <div className="flex items-center">
                  <AiOutlineDollar width={16} />{" "}
                  <span className="pl-1 ml-1 border-l border-l-2 border-l-default-300">
                    Total Pot
                  </span>
                </div>
                <Chip
                  variant="bordered"
                  className="p-3 text-white text-center max-w-none px-0 rounded-md"
                >
                  £{sstake.entry_cost * sstake.participants}.00
                </Chip>
              </div>
              <div className="flex justify-between w-full mt-2">
                <div className="flex items-center">
                  <AiOutlineDollar width={16} />{" "}
                  <span className="pl-1 ml-1 border-l border-l-2 border-l-default-300">
                    Entry
                  </span>
                </div>
                <Chip
                  className="p-3 text-white text-center max-w-none px-0 rounded-md"
                  variant="bordered"
                >
                  £{sstake.entry_cost}
                </Chip>
              </div>
              <div className="flex justify-between w-full mt-2">
                <div className="flex items-center">
                  <MdPeopleAlt />{" "}
                  <span className="pl-1 ml-1 border-l border-l-2 border-l-default-300">
                    Participants
                  </span>
                </div>
                <Chip
                  className="p-3 text-white text-center max-w-none px-0 rounded-md"
                  variant="bordered"
                >
                  {sstake.participants}
                </Chip>
              </div>

              <Button
                onPress={() => handleRowClick(index)}
                variant="faded"
                className="mt-4 bg-transparent rounded-md"
                color="warning"
              >
                View Sweepstake
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
      {!sweepstakes.length && (
        <Card className="rounded-lg p-6 text-center" fullWidth>
          No {type} sweepstakes
        </Card>
      )}
    </div>
  );
}
