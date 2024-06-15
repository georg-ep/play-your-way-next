"use client";

import { Card } from "@nextui-org/card";
import Team from "../Match/Team";
import { useEffect, useState } from "react";
import { Chip } from "@nextui-org/chip";

export default function LiveGamesTile() {
  const [liveGames, setLiveGames] = useState<object[]>([]);

  useEffect(() => {
    try {
      const ws = new WebSocket("wss://e97b-2a02-6b6f-f820-ad00-443d-26d-e564-a48d.ngrok-free.app/ws/chat/");
      // const ws = new WebSocket("ws://localhost:8080/ws/chat/");
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data?.live_matches) {
          setLiveGames(data.live_matches);
        }
      };
      ws.onerror = (e) => {
        console.log("ERROR", e);
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
      <div className="grid gap-2 md:grid-cols-2 grid-cols-1">
        {liveGames &&
          liveGames.map((game) => (
            <Card
              key={game.id}
              className="mb-4 p-4 flex justify-center flex-row items-center"
            >
              <Team team={game?.home_team} />
              <div className="text-center min-w-[100px]">
                <div className='text-[20px] text-white'>
                  {game?.result.home_score} - {game?.result.away_score}
                </div>
                <Chip color={getStatus(game?.status) === "HT" ? 'warning' : 'secondary'} variant="flat" className="mt-2">
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
