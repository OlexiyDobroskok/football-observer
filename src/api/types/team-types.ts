import { PlayerPosition } from "../helpers/consts";
import { ApiParams } from "./global";

export interface TeamSquadParams extends ApiParams {
  teamId: number;
}

export interface TeamDefinition {
  id: number;
  name: string;
  code: string;
  country: string;
  founded: number;
  national: boolean;
  logo: string;
}

export interface TeamVenue {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}

export interface TeamInformation {
  team: TeamDefinition;
  venue: TeamVenue;
}

export interface CoachBirth {
  date: string;
  place: string;
  country: string;
}

export interface TeamCareer {
  team: Pick<TeamDefinition, "id" | "name" | "logo">;
  start: string;
  end: string | null;
}

export interface CoachInformation {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: CoachBirth;
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  team: Pick<TeamDefinition, "id" | "name" | "logo">;
  career: TeamCareer[];
}

export interface TeamPlayerDefinition {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: PlayerPosition;
  photo: string;
}

export interface TeamSquad {
  team: Pick<TeamDefinition, "id" | "name" | "logo">;
  players: TeamPlayerDefinition[];
}
