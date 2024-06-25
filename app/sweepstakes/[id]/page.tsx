"use client";
import { Sweepstake } from "@/components/Tables/Sweepstakes";
import { ShortMatch } from "@/interfaces/models/Match";
import { sweepstakeServices } from "@/services/sweepstake";
import { useSweepstakeStore } from "@/stores/sweepstake";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SweepstakeHeader from "@/components/Sweepstake/Header";
import SweepstakeBreadcrumbs from "@/components/Sweepstake/Breadcrumbs";
import SweepstakeTabs from "@/components/Sweepstake/Tabs";

export interface FullTimeSelection {
  [match_id: number]: "Home" | "Draw" | "Away";
}

export default function SweepstakeIndex() {
  const params = useParams();
  const { fetchSweepstakeDetail } = sweepstakeServices();

  useEffect(() => {
    fetchSweepstake();
  }, []);

  const fetchSweepstake = async () => {
    await fetchSweepstakeDetail(Number(params.id));
  };

  return (
    <div className="dark flex text-white flex-col justify-start w-full">
      <SweepstakeBreadcrumbs />
      <SweepstakeHeader />
      <SweepstakeTabs />
    </div>
  );
}
