import { User } from "discord.js";

export type Player = {
  user: User;
  captain: boolean;
};

type BaseGame = {
  captains: [User, User];
  team1: Player[];
  team2: Player[];
  startedAt: Date;
  completed: boolean;
};

export type UnfinishedGame = BaseGame & {
  completed: false;
};

export type FinishedGame = BaseGame & {
  winner: User;
  finishedAt: Date;
  completed: true;
};

export type Game = UnfinishedGame | FinishedGame;

export class GameManager {
  // TODO: implement me
}
