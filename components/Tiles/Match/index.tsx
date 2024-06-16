import { format } from "@/utils/format";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import TeamTile from "./Team";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";

export default function MatchTile({
  match,
  selections,
  setSelections,
  outcome,
}) {
  const outcomes = [
    { label: "H", value: "Home", color: "success" },
    { label: "D", value: "Draw", color: "warning" },
    { label: "A", value: "Away", color: "danger" },
  ];

  const matchStarted = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div
      className={`flex gap-2 border border-1 border-default-400 items-start justify-center py-8 rounded-lg ${
        match.status === "FINISHED"
          ? outcome === true
            ? "border-success"
            : "border-[#C20E4D]"
          : match.status === "IN_PLAY" || match.status === "PAUSED"
          ? "border-warning"
          : null
      }`}
    >
      <TeamTile team={match.home_team} />
      <div className="flex flex-col justify-center">
        <div className="flex gap-2">
          {outcomes.map((outcome) => (
            <Button
              variant="faded"
              onPress={() =>
                setSelections({ ...selections, [match.id]: outcome.value })
              }
              key={outcome.value}
              isDisabled={matchStarted(match.utc_date)}
              className={`${
                selections[match.id] === outcome.value
                  ? `border-${outcome.color}`
                  : null
              } p-0 h-[40px] w-[40px] min-w-0`}
              color={outcome.color}
            >
              {outcome.label}
            </Button>
          ))}
        </div>
        <div className="inline-flex whitespace-nowrap justify-center items-center mt-2">
          <div className="text-[14px]">{format(match.utc_date)}</div>
        </div>
        <div className={`inline-flex justify-center items-center mt-2`}>
          <Chip
            startContent={
              match.status === "FINISHED" ? (
                outcome === true ? (
                  <FaCheckCircle className="ml-2" color="#12A150" />
                ) : (
                  <FaCircleXmark color="#F31260" className="ml-2" />
                )
              ) : null
            }
            variant="faded"
            size="lg"
            color={
              match.status === "FINISHED"
                ? outcome === true
                  ? "success"
                  : "danger"
                : "default"
            }
            className={`text-[10px]`}
          >
            3 pts
          </Chip>
        </div>
      </div>
      <TeamTile team={match.away_team} />
    </div>
  );
}
