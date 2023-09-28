import { Client, GatewayIntentBits, Collection } from "discord.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

import { SlashCommand } from "./types";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { join } from "path";
config();

client.commands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, "./handlers");
readdirSync(handlersDir).forEach((handler) => {
  if (!handler.endsWith(".js")) return;
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.TOKEN);
