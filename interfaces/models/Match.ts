import { ShortTeam } from "./Team";

export interface Competition {
    name: string;
    matches: ShortMatch[];
}

export interface ShortMatch {
    id: number;
    date: string;
    home_team: ShortTeam;
    away_team: ShortTeam;
}