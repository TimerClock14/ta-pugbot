import { Collection } from "discord.js";

export type Queue = { members: Set<string> };

export type QueueManager = {
  queues: Collection<string, Queue>;
};
