import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  Collection,
} from "discord.js";
import { QueueManager } from "./queue/QueueManager";
import type { Document } from "mongoose";

export interface SlashCommand {
  command: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  /** in seconds */
  cooldown?: number;
}

interface GuildOptions {
  prefix: string;
}

export interface IGuild extends Document {
  guildID: string;
  options: GuildOptions;
  joinedAt: Date;
}

export type GuildOption = keyof GuildOptions;
export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      CLIENT_ID: string;
      PREFIX: string;
      PUBLIC_KEY: string;
      CLIENT_SECRET: string;
      MONGO_URI: string;
      MONGO_DATABASE_NAME: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommand>;
    queueManager: QueueManager;
    cooldowns: Collection<string, number>;
  }
}
