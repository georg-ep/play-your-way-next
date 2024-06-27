import { format } from "@/utils/format";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
} from "@nextui-org/react";
import Image from "next/image";
import TeamTile from "./Team";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { apiFetchPlayers } from "@/api/match";

export default function MatchTile({
  match,
  selections,
  setSelections,
  scoreSelections,
  setScoreSelections,
  outcome,
  disabled = false,
}) {
  const [players, setPlayers] = useState([]);

  const outcomes = [
    { label: "H", value: "Home", color: "success" },
    { label: "D", value: "Draw", color: "warning" },
    { label: "A", value: "Away", color: "danger" },
  ];

  // useEffect(() => {
  //   fetchPlayers();
  // }, []);

  // const fetchPlayers = async () => {
  //   const data = await apiFetchPlayers(match.id);
  //   setPlayers(
  //     data.map((player) => ({ label: player.name, value: player.id }))
  //   );
  // };

  const matchStarted = (date) => {
    return new Date(date) < new Date();
  };

  return (
    <div
      className={`gap-2 border border-1 py-8 rounded-lg ${
        match.status === "FINISHED"
          ? outcome === true
            ? "border-success"
            : "border-danger"
          : match.status === "IN_PLAY" || match.status === "PAUSED"
          ? "border-warning"
          : "border-default-400"
      }`}
    >
      <div className="px-2 mb-8 w-full flex flex-col items-center gap-2">
        <Autocomplete
          label="Player to score"
          placeholder="Search players"
          fullWidth
          inputValue={players?.find((item) => item.value === scoreSelections[match.id])?.label}
          onSelectionChange={(value) => {
            setScoreSelections({ ...scoreSelections, [match.id]: Number(value) });
          }}
          isDisabled={matchStarted(match.date) || disabled || true}
          endContent={
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
              5 pts
            </Chip>
          }
          variant="bordered"
          defaultItems={players}
          className="max-w-xs"
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="flex items-start justify-center ">
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
                isDisabled={matchStarted(match.date) || disabled}
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
            <div className="text-[14px]">{format(match.date)}</div>
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
    </div>
  );
}
