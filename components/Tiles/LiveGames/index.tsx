"use client";

import { Card } from "@nextui-org/card";
import Team from "../Match/Team";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";

export default function LiveGamesTile() {
  const [liveGames, setLiveGames] = useState<object[]>([]);

  const URL = "ws://3.10.140.74/ws/live-games/";

  useEffect(() => {
    if (URL.startsWith("ws://")) {
      return;
    }
    const ws = new WebSocket(URL);
    try {
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        setLiveGames(data?.live_matches);
        console.log(JSON.parse(e.data));
      };
      ws.onopen = (e) => {
        console.log(e);
      };
      ws.onerror = (e) => {
        console.log(e);
      };
      ws.onclose = (e) => {
        console.log(e);
      };
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getStatus = (status) => {
    return status === "IN_PLAY" ? "In Play" : status === "PAUSED" ? "HT" : "";
  };
  return (
    <div
      className={`${
        liveGames && liveGames.length > 0 ? "max-h-[600px]" : "max-h-0"
      } transition-all duration-500 ease overflow-hidden`}
    >
      <div className="font-bold text-white text-[20px] mb-2">Live Games</div>
      <div className="grid gap-2 md:grid-cols-2 grid-cols-1 mb-8">
        {liveGames &&
          liveGames.map((game) => (
            <Card
              key={game.id}
              className="p-4 flex justify-center flex-row items-center border border-2 border-default-400 bg-transparent"
            >
              <Team team={game?.home_team} />
              <div className="text-center min-w-[100px]">
                <div className="text-[20px] text-white">
                  {game?.result.home_score} - {game?.result.away_score}
                </div>
                <Chip
                  color={
                    getStatus(game?.status) === "HT" ? "warning" : "secondary"
                  }
                  variant="flat"
                  className="mt-2"
                >
                  {getStatus(game?.status)}
                </Chip>
              </div>
              <Team team={game?.away_team} />
            </Card>
          ))}
      </div>
    </div>
  );
}
