import { Client, GatewayIntentBits } from "discord.js";
import config from "./config.json";
import { readyListener } from "./listeners/ready";
import { interactionCreateListener } from "./listeners/interactionCreate";

const token = config.botToken;

console.log("Bot is starting...");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

readyListener(client);
interactionCreateListener(client);

client.login(token);
