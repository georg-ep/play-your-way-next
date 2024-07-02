import LeaderboardTable from "@/components/Tables/Leaderboard";
import { Tab, Tabs } from "@nextui-org/react";
import SelectionsTab from "./Selections";

export default function SweepstakeTabs() {
  return (
    <Tabs variant="bordered" fullWidth className="sticky">
      <Tab key="selections" title="Selections">
        <SelectionsTab />
      </Tab>

      <Tab className="w-full" key="leaderboard" title="Leaderboard">
        <LeaderboardTable />
      </Tab>
    </Tabs>
  );
}
