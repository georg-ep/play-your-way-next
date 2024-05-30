"use client";

import Table from "@/components/Table";
import { TableRowData } from "@/interfaces/components/Table";
import { useEffect, useState } from "react";
import { Competition, ShortMatch } from "@/interfaces/models/Match";
import { fetchMatches } from "@/api/match";
import { format } from "@/utils/format";
import { useUIStore } from "@/stores/ui";
import { Button, Card, CardBody, Chip, Tab, Tabs, ThemeColors } from "@nextui-org/react";
import { TableProps } from "@/interfaces/components/Table";
import { toast } from "react-toastify";
import { User, useUserStore } from "@/stores/user";
import { ShortTeam } from "@/interfaces/models/Team";
import { useBetStore } from "@/stores/bet";
import { betServices } from "@/services/bet";

interface TableData {
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
  const headers: string[] = ["Home Team", "Away Team", "Date", "Actions"];
  const [tableData, setTableData] = useState<TableData[]>([]);
  const { openModal } = useUIStore();
  const { fetchOpenBets, fetchMyBets } = betServices();
  const { openBets, myBets } = useBetStore();
  const { user } = useUserStore();
  const [betData, setBetData] = useState<TableProps | null>(null);
  const [tab, setTab] = useState<string>('upcoming');

  useEffect(() => {
    const fetchData = async () => {
      const competitions: Competition[] = await fetchMatches();
      const _tableData: TableData[] = [];
      competitions.forEach((competition: Competition) => {
        const _rows: TableRowData[] = [];
        competition.matches.forEach((match: ShortMatch) =>
          _rows.push({
            cells: [
              match.home_team.short_name,
              match.away_team.short_name,
              format(match.utc_date),
              <Button
                onClick={() => openModal("place-bet", match)}
                fullWidth
                size="sm"
                color="primary"
              >
                Create Bet
              </Button>,
            ],
          })
        );
        _tableData.push({ title: competition.name, rows: _rows });
      });
      setTableData(_tableData);
    };
    fetchData();
  }, []);

  const acceptBet = (bet: Bet) => {
    if (parseFloat(user!.credits) < parseFloat(bet.amount)) {
      toast.error("Not enough balance");
      return openModal("deposit");
    } else {
      openModal("confirm-bet", bet);
    }
  };

  useEffect(() => {
    if (openBets) {
      displayBets();
    }
  }, [openBets]);

  const displayBets = async () => {
    let bets: Bet[];
    let headers: string[] = [];
    let rows: TableRowData[] = [];
    if (tab === 'my-bets') {
      bets = await fetchMyBets();
      headers = ["Date", "You need", "Match", "Amount", "Opponent"];
      bets!.forEach((bet: Bet) => {
        console.log(bet.opponent);
        rows.push({
          cells: [
            format(bet.date),
            <div className="flex justify-between items-center gap-2">
              <div>{bet.outcome!.value}</div>
              <Chip color={bet.outcome!.color} variant="flat" size="sm" radius="sm">
                {bet.outcome!.label}
              </Chip>
            </div>,
            bet.match_name,
            `£${bet.amount}`,
            bet.opponent?.username,
          ],
        });
      });
    } else if (tab === 'open-bets') {
      bets = await fetchOpenBets();
      headers = ["Date", "You need", "Match", "Amount", "Actions"];
      bets!.forEach((bet: Bet) => {
        rows.push({
          cells: [
            format(bet.date),
            <div className="flex justify-between items-center gap-2">
              <div>{bet.outcome!.value}</div>
              <Chip color={bet.outcome!.color} variant="flat" size="sm" radius="sm">
                {bet.outcome!.label}
              </Chip>
            </div>,
            bet.match_name,
            `£${bet.amount}`,
            <Button
              onClick={() => acceptBet(bet)}
              size="sm"
              variant="flat"
              color="primary"
            >
              Accept
            </Button>,
          ],
        });
      });
    }
    setBetData({
      headers,
      rows,
    });
  };

  useEffect(() => {
    if (['my-bets', 'open-bets'].includes(tab)) {
      displayBets();
    }
  }, [tab]);


  return (
    <main className="dark flex min-h-screen flex-col items-center justify-between p-12">
      <div className="flex justify-start flex-col w-full mb-4">
        <Tabs
          onSelectionChange={(e: any) => setTab(e)}
          aria-label="Navigation"
          disabledKeys={user ? [] : ["open-bets", "my-bets"]}
          id="tabs"
        >
          <Tab key="upcoming" title="Upcoming matches">
            <Tabs variant="underlined">
              {tableData &&
                tableData.map((table) => (
                  <Tab key={table.title} title={table.title}>
                    <Table rows={table.rows} headers={headers} />
                  </Tab>
                ))}
            </Tabs>
          </Tab>
          <Tab key="my-bets" title="My bets">
            {betData && (
              <Table headers={betData.headers} rows={betData.rows} />
            )}
          </Tab>
          <Tab key="open-bets" title="Open bets">
            {betData && (
              <Table headers={betData.headers} rows={betData.rows} />
            )}
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
