"use client";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { ShortMatch } from "@/interfaces/models/Match";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "@/utils/format";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import LeaderboardTable from "@/components/Tables/Leaderboard";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export interface FullTimeSelection {
  [match_id: number]: "Home" | "Draw" | "Away";
}

export default function SweepstakeIndex() {
  const params = useParams();
  const { fetchSweepstakeDetail, submitSelections } = sweepstakeServices();
  const [sweepstake, setSweepstake] = useState<Sweepstake | null>(null);
  const [selections, setSelections] = useState<FullTimeSelection>({});
  const router = useRouter();

  useEffect(() => {
    fetchSweepstake();
  }, []);

  const fetchSweepstake = async () => {
    const _sweepstake: Sweepstake = await fetchSweepstakeDetail(
      Number(params.id)
    );
    setSweepstake(_sweepstake);
    if (_sweepstake.selections) {
      const _selections: FullTimeSelection = _sweepstake.selections.reduce(
        (acc, selection) => {
          return {
            ...acc,
            [selection.match]: selection.outcome,
          };
        },
        {}
      );
      setSelections(_selections);
    }
  };

  const submit = async () => {
    try {
      await submitSelections(Number(params.id), selections);
      toast.success("Submitted selections");
    } catch (e) {
      toast.error("Error submitting selections");
    }
  };

  return (
    <div className="dark flex min-h-screen text-white flex-col justify-start w-full max-sm:px-2 max-sm:py-6 md:p-12">
      <Breadcrumbs variant="solid" key="crumbs" size="md" className="mb-8">
        <BreadcrumbItem onClick={() => router.push("/")}>
          Sweepstakes
        </BreadcrumbItem>
        <BreadcrumbItem>
          {sweepstake?.name ?? <Spinner size="sm" color="default" />}
        </BreadcrumbItem>
      </Breadcrumbs>
      <Card className="mb-4 p-4">
        {sweepstake?.name ? (
          <CardHeader className="flex gap-3">
            <div className="w-full">
              <div>
                <p className="text-[32px] text-center font-bold">{sweepstake.name}</p>
                <p className="text-lg text-center text-default-600">
                  {format(sweepstake.start_date)}
                </p>
              <div className='my-2 flex flex-wrap justify-center gap-2'>
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
        <Divider />
        <CardBody>
          <p className="text-default-600 text-md font-medium mb-4">How to play</p>
          <div className="border border-default-300 rounded p-4">
            <ol className="list-decimal list-inside text-sm">
              <li className="mb-2">
                Lets get this party started, <span className="font-semibold">bois!</span>
              </li>
              <li className="mb-2">
                Select your outcomes of the games below.
              </li>
              <li className="mb-2">
                Each correct prediction will be worth <span className="font-semibold">3 points</span>.
              </li>
              <li className="mb-2">
                Check your score by clicking the <span className="font-semibold">leaderboard</span> tab.
              </li>
              <li className="mb-2">
                The winner will take home the <span className="font-semibold">pot</span>.
              </li>
              <li className="mb-2">
                Enjoy the <span className="font-semibold">jubbly</span> experience!
              </li>
            </ol>
          </div>
        </CardBody>
      </Card>
      <Tabs className="w-full">
        <Tab className="w-full" key="selections" title="Selections">
          {sweepstake && sweepstake.matches ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sweepstake &&
                sweepstake.matches.map((match: ShortMatch, index: number) => (
                  <div
                    key={`match_${index}`}
                    className="flex gap-2 border border-1 border-default-400 items-start justify-center bg-[#ffffff20] p-2 rounded-lg"
                  >
                    <div className="flex gap-1 w-[150px] truncate items-center justify-end">
                      <div>{match.home_team.short_name}</div>
                      {match.home_team.crest && (
                        <Image
                          className="rounded-lg"
                          src={match.home_team.crest}
                          height={30}
                          width={30}
                          alt="home-team-crest"
                        />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-2">
                        <Button
                          onClick={() =>
                            setSelections({ ...selections, [match.id]: "Home" })
                          }
                          variant={
                            selections[match.id] === "Home"
                              ? "solid"
                              : "bordered"
                          }
                          color="success"
                          className="p-0 h-[30px] w-[30px] min-w-0"
                        >
                          W
                        </Button>
                        <Button
                          onClick={() =>
                            setSelections({ ...selections, [match.id]: "Draw" })
                          }
                          variant={
                            selections[match.id] === "Draw"
                              ? "solid"
                              : "bordered"
                          }
                          color="warning"
                          className="p-0 h-[30px] w-[30px] min-w-0"
                        >
                          D
                        </Button>
                        <Button
                          onClick={() =>
                            setSelections({ ...selections, [match.id]: "Away" })
                          }
                          variant={
                            selections[match.id] === "Away"
                              ? "solid"
                              : "bordered"
                          }
                          color="danger"
                          className="p-0 h-[30px] w-[30px] min-w-0"
                        >
                          W
                        </Button>
                      </div>
                      <div className="inline-flex justify-center items-center mt-2">
                        <Chip
                          variant="faded"
                          color="default"
                          className="text-[10px]"
                        >
                          3 pts
                        </Chip>
                      </div>
                      <div className="inline-flex justify-center items-center mt-2">
                        <div className="text-[10px]">
                          {format(match.utc_date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 w-[150px] truncate items-center">
                      {match.away_team.crest && (
                        <Image
                          src={match.away_team.crest}
                          className="rounded-lg"
                          height={30}
                          width={30}
                          alt="home-team-crest"
                        />
                      )}
                      <div>{match.away_team.short_name}</div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex items-center justify-center mt-24">
              <Spinner color="default" size="lg" />
            </div>
          )}
          <div className="max-sm:fixed max-sm:sticky box-border bottom-0 bg-black">
            <Button
              variant="solid"
              color="success"
              onClick={() => submit()}
              fullWidth
              className="mt-4 max-sm:mb-4"
            >
              Save
            </Button>
          </div>
        </Tab>
        <Tab className="w-full" key="leaderboard" title="Leaderboard">
          <LeaderboardTable />
        </Tab>
      </Tabs>
    </div>
  );
}
