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
import { useUIStore } from "@/stores/ui";
import { userServices } from "@/services/user";
import { PrivateLeague } from "@/components/Tables/MyLeagues";
import { FullTimeSelection } from "@/app/sweepstakes/[id]/page";
import SweepstakeBreadcrumbs from "@/components/Sweepstake/Breadcrumbs";
import SweepstakeHeader from "@/components/Sweepstake/Header";
import SweepstakeTabs from "@/components/Sweepstake/Tabs";

export default function PrivateLeagueIndex() {
  const params = useParams();
  const { fetchPrivateLeague } = sweepstakeServices();
  const { privateLeague: PL, setSweepstake } = useSweepstakeStore();

  useEffect(() => {
    fetchLeague();
  }, []);

  const fetchLeague = async () => {
    const _league = await fetchPrivateLeague(params.code as string);
    setSweepstake(_league.sweepstake);
  };


  return (
    <div className="dark flex text-white flex-col justify-start w-full">
      <SweepstakeBreadcrumbs />
      <SweepstakeHeader />
      <SweepstakeTabs />
    </div>
  );
}
