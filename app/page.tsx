"use client";
import { useEffect, useState } from "react";
import { Tab, Tabs, ThemeColors } from "@nextui-org/react";
import { User, useUserStore } from "@/stores/user";
import { ShortTeam } from "@/interfaces/models/Team";
import MyBetsTable from "@/components/Tables/MyBets";
import OpenBetsTable from "@/components/Tables/OpenBets";
import LiveBetsTable from "@/components/Tables/LiveBets";
import UpcomingMatchesTable from "@/components/Tables/UpcomingMatches";
import SweepstakesTable from "@/components/Tables/Sweepstakes";

export interface TableData {
  title: string;
  rows: any[];
}

export interface Outcome {
  label: string;
  color: ThemeColors;
  value: string;
}

export interface Bet {
  id: number;
  amount: string;
  bet_type: string;
  date: string;
  match_name?: string;
  opponent: null | User;
  selected_object: ShortTeam;
  status: string;
  outcome: Outcome | null;
}

export default function Home() {
  const { user } = useUserStore();
  const [tab, setTab] = useState<string>("live");

  return (
    <main className="dark flex min-h-screen flex-col items-center justify-between max-sm:px-2 max-sm:py-6 md:p-12">
      <div className="flex justify-start flex-col w-full mb-4">
        <Tabs
          onSelectionChange={(e: any) => setTab(e)}
          aria-label="Navigation"
          disabledKeys={user ? [] : ["open-bets", "my-bets"]}
          id="tabs"
        >
          <Tab key='sweepstakes' title='Sweepstakes'>
            <SweepstakesTable />
          </Tab>
          <Tab key="live" title="Live matches">
            <LiveBetsTable />
          </Tab>
          <Tab key="upcoming" title="Upcoming matches">
            <UpcomingMatchesTable />
          </Tab>
          <Tab key="my-bets" title="My bets">
            <MyBetsTable />
          </Tab>
          <Tab key="open-bets" title="Open bets">
            <OpenBetsTable />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
