import { format } from "@/utils/format";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import TeamTile from "./Team";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { apiFetchPlayers } from "@/api/match";

export default function MatchTile({
  match,
  winnerSelection,
  updateWinner,
  scorerSelection,
  updateScorer,
  scoreSelection,
  updateScore,
  types,
  disabled = false,
}) {
  const [players, setPlayers] = useState([]);

  const outcomes = [
    { label: "H", value: "Home", color: "success" },
    { label: "D", value: "Draw", color: "warning" },
    { label: "A", value: "Away", color: "danger" },
  ];

  const isPTS = () => types.find((t) => t.value === "PTS");
  const isMW = () => types.find((t) => t.value === "MW");
  const isMS = () => types.find((t) => t.value === "MS");

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
      className={`gap-2 border border-1 p-3 rounded-lg ${
        match.status === "FINISHED"
          ? winnerSelection?.correct_outcome
            ? "border-success"
            : "border-danger"
          : match.status === "IN_PLAY" || match.status === "PAUSED"
          ? "border-warning"
          : "border-default-400"
      }`}
    >
      <div className="text-[14px] text-default-600">{format(match.date)}</div>
      {isPTS() && (
        <div className="px-2 mb-8 w-full flex flex-col items-center gap-2">
          <Autocomplete
            label="Player to score"
            placeholder="Search players"
            fullWidth
            inputValue={scoreSelection?.label}
            onSelectionChange={(value) =>
              updateScorer({
                [match.id]: Number(value),
              })
            }
            isDisabled={matchStarted(match.date) || disabled || true}
            endContent={
              <Chip
                startContent={
                  match.status === "FINISHED" ? (
                    winnerSelection?.correct_outcome ? (
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
                    ? winnerSelection?.correct_outcome
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
      )}
      {isMW() && (
        <div className="border-t border-t-default-400 pt-4 mt-4">
          <div className={`flex justify-between items-center mb-2`}>
            <div className="font-bold">Team to Win</div>

            <Chip
              startContent={
                match.status === "FINISHED" ? (
                  winnerSelection?.correct_outcome ? (
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
                  ? winnerSelection?.correct_outcome
                    ? "success"
                    : "danger"
                  : "default"
              }
              className={`text-[10px]`}
            >
              3 pts
            </Chip>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <TeamTile team={match.home_team} />
              <TeamTile team={match.away_team} />
            </div>
            <div>
              <div className="flex gap-2 items-center">
                {outcomes.map((outcome, index) => (
                  <Button
                    variant="faded"
                    onPress={() => updateWinner(outcome.value)}
                    key={outcome.value}
                    isDisabled={
                      matchStarted(match.date) ||
                      disabled ||
                      (index === 1 && match.is_ko)
                    }
                    className={`${
                      winnerSelection?.outcome === outcome.value
                        ? `border-${outcome.color}`
                        : null
                    } p-0 h-[50px] w-[50px] min-w-0`}
                    color={outcome.color}
                  >
                    {outcome.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isMS() && <div className=" mt-4 border-t border-t-default-300 pt-4">
        <div className="flex justify-between items-center">
          <div className="font-bold">Match Score</div>
          <Chip
            startContent={
              match.status === "FINISHED" ? (
                scoreSelection?.correct_outcome? (
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
                ? scoreSelection?.correct_outcome
                  ? "success"
                  : "danger"
                : "default"
            }
            className={`text-[10px]`}
          >
            7 pts
          </Chip>
        </div>

        <div className="mt-2 flex gap-4 justify-center items-center">
          <Input
            variant="bordered"
            value={scoreSelection?.home_score}
            onValueChange={(e) =>
              updateScore({ home_score: e === "" ? undefined : Number(e) })
            }
            type="number"
            startContent={
              <Image
                src={match.home_team.crest}
                className="w-[20px] h-[20px] mr-2"
                width={40}
                height={40}
                alt={""}
              />
            }
            className="w-full max-w-[200px]"
          />
          <div>-</div>
          <Input
            variant="bordered"
            value={scoreSelection?.away_score}
            onValueChange={(e) =>
              updateScore({ away_score: e.length === 0 ? undefined : Number(e) })
            }
            type="number"
            endContent={
              <Image
                src={match.away_team.crest}
                className="w-[20px] h-[20px] ml-2"
                width={40}
                height={40}
                alt={""}
              />
            }
            className="w-full max-w-[200px]"
          />
        </div>
      </div>}
    </div>
  );
}
