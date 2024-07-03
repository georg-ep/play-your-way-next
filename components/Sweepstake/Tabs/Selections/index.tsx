import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import MatchTile from "@/components/Tiles/Match";
import { ShortMatch } from "@/interfaces/models/Match";
import { sweepstakeServices } from "@/services/sweepstake";
import { userServices } from "@/services/user";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { useUIStore } from "@/stores/ui";
import { Button, Spinner, Tab } from "@nextui-org/react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SelectionsTab() {
  const { currentSweepstake: sweepstake, setSweepstake } = useSweepstakeStore();
  const { submitSelections } = sweepstakeServices();
  const { fetchUser } = userServices();
  const { openModal } = useUIStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [winnerSelections, setWinnerSelections] = useState<
    FullTimeSelection | object
  >({});
  const [scorerSelections, setScorerSelections] = useState({});
  const [scoreSelections, setScoreSelections] = useState({});

  useEffect(() => {
    const _selections =
      sweepstake?.winner_selections?.reduce(
        (acc, { match, outcome, correct_outcome }) => ({
          ...acc,
          [match]: { correct_outcome, outcome },
        }),
        winnerSelections || {}
      ) || {};

    setWinnerSelections(_selections);

    const _scorerSelections =
      sweepstake?.scorer_selections?.reduce(
        (acc, { match, player, correct_outcome }) => ({
          ...acc,
          [match]: { player, correct_outcome },
        }),
        scorerSelections || {}
      ) || {};

    setScorerSelections(_scorerSelections);

    const _scoreSelections =
      sweepstake?.score_selections?.reduce(
        (acc, { match, home_score, away_score, correct_outcome }) => ({
          ...acc,
          [match]: { home_score, away_score, correct_outcome },
        }),
        scoreSelections || {}
      ) || {};

    setScoreSelections(_scoreSelections);
  }, [sweepstake]);

  const submit = async () => {
    try {
      await submitSelections(
        sweepstake.id,
        winnerSelections,
        scorerSelections,
        scoreSelections
      );
      if (!sweepstake.has_entered) {
        await fetchUser();
        setSweepstake({ ...sweepstake, has_entered: true });
        openModal("entered-sweepstake");
      } else {
        toast.success("Submitted selections");
      }
    } catch (e) {
      toast.error(e.response?.detail ?? "Error submitting selections");
      if (e.response?.detail?.includes("credits")) {
        const params = new URLSearchParams(searchParams);

        if (sweepstake.is_paid) {
          params.set("tab", "prod");
        } else {
          params.set("tab", "test");
        }
        replace(`${pathname}?${params.toString()}`);
        openModal("deposit");
      }
    }
  };

  const allSelectionsMade = () => {
    return Object.keys(winnerSelections).length >= sweepstake?.matches?.length;
  };

  const hasFinished = () => sweepstake?.has_finished;

  const inProgress = () =>
    !sweepstake.has_entered && sweepstake.status === "IN_PROGRESS";

  return (
    <>
      {sweepstake && sweepstake.matches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sweepstake.matches.map((match: ShortMatch, index: number) => (
            <MatchTile
              key={`match_${index}`}
              match={match}
              types={sweepstake.type}
              disabled={inProgress()}
              winnerSelection={winnerSelections[match.id]}
              updateWinner={(e) =>
                setWinnerSelections({
                  ...winnerSelections,
                  [match.id]: { outcome: e },
                })
              }
              scorerSelection={scorerSelections[match.id]}
              updateScorer={(e) =>
                setScorerSelections({ ...scorerSelections, [match.id]: e })
              }
              scoreSelection={scoreSelections[match.id]}
              updateScore={(e) =>
                setScoreSelections({
                  ...scoreSelections,
                  [match.id]: { ...(scoreSelections[match.id] || {}), ...e },
                })
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-24">
          <Spinner color="default" size="lg" />
        </div>
      )}
      <div className="max-sm:fixed max-sm:sticky box-border bottom-0 bg-black">
        <Button
          variant="faded"
          color={!allSelectionsMade() ? "danger" : "success"}
          onPress={() => submit()}
          fullWidth
          className="mt-4 max-sm:mb-4"
          isDisabled={!allSelectionsMade() || hasFinished()}
        >
          {winnerSelections && sweepstake?.matches?.length ? (
            inProgress() ? (
              <>In Progress</>
            ) : !allSelectionsMade() ? (
              <span>
                {Object.keys(winnerSelections).length} /{" "}
                {sweepstake.matches.length} selections
              </span>
            ) : hasFinished() ? (
              <>Sweepstake Finished</>
            ) : sweepstake.has_entered ? (
              "Save Changes"
            ) : (
              "Enter Sweepstake"
            )
          ) : (
            <Spinner />
          )}
        </Button>
      </div>
    </>
  );
}
