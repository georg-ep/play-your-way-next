import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import MatchTile from "@/components/Tiles/Match";
import { ShortMatch } from "@/interfaces/models/Match";
import { sweepstakeServices } from "@/services/sweepstake";
import { userServices } from "@/services/user";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { useUIStore } from "@/stores/ui";
import { Button, Spinner, Tab } from "@nextui-org/react";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SelectionsTab() {
  const { currentSweepstake: sweepstake, setSweepstake } = useSweepstakeStore();
  const { submitSelections } = sweepstakeServices();
  const { fetchUser } = userServices();
  const { openModal } = useUIStore();

  const [selections, setSelections] = useState<FullTimeSelection>({});
  const [scoreSelections, setScoreSelections] = useState({});

  useEffect(() => {
    if (sweepstake && sweepstake?.selections) {
      const _selections: FullTimeSelection = sweepstake.selections.reduce(
        (acc, selection) => {
          return {
            ...acc,
            [selection.match]: selection.outcome,
          };
        },
        {}
      );
      setSelections(_selections);
    } else if (selections) {
      setSelections(selections);
    } else {
      setSelections({});
    }

    if (sweepstake && sweepstake?.score_selections) {
      const _selections = sweepstake.score_selections.reduce(
        (acc, selection) => {
          return {
            ...acc,
            [selection.match]: selection.player,
          };
        },
        {}
      );
      setScoreSelections(_selections);
    } else if (scoreSelections) {
      setScoreSelections(scoreSelections);
    } else {
      setScoreSelections({});
    }
  }, [sweepstake]);

  const submit = async () => {
    try {
      await submitSelections(sweepstake.id, selections, scoreSelections);
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
        openModal("deposit");
      }
    }
  };

  const allSelectionsMade = () => {
    return Object.keys(selections).length >= sweepstake?.matches?.length;
  };

  const hasFinished = () => sweepstake?.has_finished;

  const inProgress = () =>
    !sweepstake.has_entered && sweepstake.status === "IN_PROGRESS";

  const outcome = (match) =>
    sweepstake?.selections?.find((selection) => selection.match === match.id)
      ?.correct_outcome;

  return (
    <>
      {sweepstake && sweepstake.matches ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {sweepstake.matches.map((match: ShortMatch, index: number) => (
            <MatchTile
              key={`match_${index}`}
              match={match}
              disabled={inProgress()}
              outcome={outcome(match)}
              selections={selections}
              setSelections={setSelections}
              scoreSelections={scoreSelections}
              setScoreSelections={setScoreSelections}
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
          {selections && sweepstake?.matches?.length ? (
            inProgress() ? (
              <>In Progress</>
            ) : !allSelectionsMade() ? (
              <span>
                {Object.keys(selections).length} / {sweepstake.matches.length}{" "}
                selections
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
