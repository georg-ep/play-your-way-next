import Table from "@/components/Table";
import { sweepstakeServices } from "@/services/sweepstake";
import { userServices } from "@/services/user";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { useUIStore } from "@/stores/ui";
import { useUserStore } from "@/stores/user";
import { Button, Card, Input, Tab, Tabs } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import { toast } from "react-toastify";
import { Sweepstake } from "../Sweepstakes";

export interface PrivateLeague {
  id: number;
  name: string;
  entry_cost: number;
  member_count: number;
  code: string;
  user_in_league?: boolean;
  sweepstake: number | Sweepstake;
}

export default function MyLeaguesTable() {
  const [league, setLeague] = useState<string>("");
  const [leagueName, setLeagueName] = useState<string>("");
  const [leagueFound, setLeagueFound] = useState<PrivateLeague | null>(null);
  const { findPrivateLeague, joinPrivateLeague, myPrivateLeagues } =
    sweepstakeServices();
  const { privateLeagues } = useSweepstakeStore();
  const { user } = useUserStore();
  const { fetchUser } = userServices();
  const { openModal } = useUIStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await findPrivateLeague(league);
      setLeagueFound(data);
    } catch (e) {
      toast.error(e.response?.detail ?? "Error fetching league");
    }
  };

  const handleJoinLeague = async () => {
    if (leagueFound.user_in_league) {
      return router.push(`/leagues/${leagueFound.code}/`)
    } else if (Number(user.credits) < leagueFound.entry_cost) {
      openModal("deposit");
    } else {
      try {
        await joinPrivateLeague(leagueFound.code);
        await fetchUser();
      } catch (e) {
        toast.error(e.response?.detail ?? "Error joining league");
      }
    }
  };

  const handleTabChange = async (e: Key) => {
    try {
      if (e === "joined") {
        await myPrivateLeagues();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tabs onSelectionChange={handleTabChange} fullWidth variant="solid">
      {/* <Tab key="created" title="Created Leagues">
        <Table headers={["hey"]} rows={[{ cells: ["hey"] }]} />
      </Tab> */}
      <Tab key="join" title="Join">
        <Card className="p-4">
          <div className="font-bold text-white text-[24px]">Join a league</div>
          <div className="text-default-500 mb-4">
            Enter the code below to find and join a league!
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="Join code"
              variant="faded"
              value={league}
              onValueChange={setLeague}
              isRequired
              isClearable
              minLength={6}
              maxLength={6}
            />
            <Button
              type="submit"
              variant="flat"
              className="mt-4"
              color="primary"
              fullWidth
            >
              Find
            </Button>
          </form>
          {leagueFound && (
            <Card className="mt-4 border border-1 border-default-500 rounded-lg p-4 bg-opacity-80">
              <div className="text-white text-[16px] mb-4">
                {leagueFound.name} | {leagueFound.member_count} members
              </div>
              <Button onPress={handleJoinLeague} variant="flat" color="success">
                {leagueFound.user_in_league
                  ? "View league"
                  : `Join now for £${leagueFound?.entry_cost}.00`}
              </Button>
            </Card>
          )}
        </Card>
        <Card className="p-4 mt-4">
          <div className="font-bold text-white text-[24px]">
            Create a league
          </div>
          <div className="text-default-500 mb-4">
            Enter a name for your league to get started
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              label="League Name"
              variant="faded"
              value={leagueName}
              onValueChange={setLeagueName}
              isRequired
              isClearable
              isDisabled
            />
            <Button
              type="submit"
              variant="flat"
              className="mt-4"
              color="primary"
              fullWidth
              isDisabled
            >
              Coming soon...
            </Button>
          </form>
        </Card>
      </Tab>
      <Tab key="joined" title="My leagues">
        <Table
          headers={["Name", "Members", ""]}
          rows={privateLeagues?.map((league) => ({
            cells: [
              league.name,
              league.member_count,
              <Button
                onPress={() =>
                  router.push(`/leagues/${league.code}/`)
                }
                fullWidth
                size="sm"
                color="primary"
                variant="flat"
              >
                View
              </Button>,
            ],
          }))}
        />
      </Tab>
    </Tabs>
  );
}
