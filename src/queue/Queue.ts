import { User, Collection } from "discord.js";
import { Game, GameManager } from "./GameManager";
import { QueueManager } from "./QueueManager";
import { keys } from "../functions";

export type PickOrder = string;

export const generateDefaultPickOrder = (size: number): PickOrder => {
  const values: number[] = [];

  for (let i = 0; i < size; i++) {
    values.push(1);
  }

  return values.join("");
};

export const parsePickOrder = (pickOrder: PickOrder) =>
  pickOrder.split("").map(Number);

export const formatQueueSettings = (settings: QueueSettings) =>
  keys(settings)
    .map((key) => `${key}: ${settings[key]}`)
    .join("\n");

export type QueueSettings = {
  /** Required number of players for a game in this queue to start */
  size: number;
  pickOrder: PickOrder;
};

export class Queue {
  private gameManager = new GameManager();
  private _name: string;
  private _members = new Collection<string, User>();
  readonly activeGames: Game[] = [];
  private _settings: QueueSettings;
  private _queueManager: QueueManager;

  constructor(
    name: string,
    settings: QueueSettings,
    queueManager: QueueManager
  ) {
    this._name = name;
    this._settings = settings;
    this._queueManager = queueManager;
  }

  getSnapshot() {
    return {
      name: this._name,
      size: this._settings.size,
      pickOrder: this._settings.pickOrder,
    };
  }

  get settings() {
    return { ...this._settings };
  }

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._queueManager.updateQueueName(this._name, value);
  }

  updateSettings(update: Partial<QueueSettings>) {
    this._settings = {
      ...this._settings,
      ...update,
    };
  }

  get members() {
    const tmpMembers: User[] = [];

    this._members.forEach((member) => tmpMembers.push(member));

    return tmpMembers;
  }

  addMember(member: User) {
    return this._members.set(member.id, member);
  }

  delMember(member: User) {
    return this._members.delete(member.id);
  }

  /** INTERNAL USE ONLY. Prefer setter at `Queue.prototype.name` */
  __dangerouslySetNameNoPropagate(value: string) {
    this._name = value;
  }
}
