import { User } from "discord.js";
import { Queue, QueueSettings } from "./Queue";

export class QueueManager {
  private _queues: {
    [name: string]: Queue;
  } = {};

  private _memberRegisteredQueueMap: {
    [memberId: string]: Set<string>;
  } = {};

  private queueNameExists(name: string) {
    return Boolean(this._queues[name]);
  }

  getMemberRegisteredQueueNames(member: User) {
    return this._memberRegisteredQueueMap[member.id];
  }

  getMemberRegisteredQueues(member: User) {
    const queues: Queue[] = [];

    this.getMemberRegisteredQueueNames(member)?.forEach((queueName) => {
      queues.push(this._queues[queueName]);
    });

    return queues;
  }

  /**
   * @returns true if new queue was created, false if queue with specified name already existed
   */
  createQueue(name: string, settings: QueueSettings) {
    if (!this.queueNameExists(name)) {
      this._queues[name] = new Queue(name, settings, this);
      return true;
    }

    return false;
  }

  /**
   * @returns true if queue was removed successfully, false if no queue with specified name exists
   */
  removeQueue(name: string) {
    if (!this.queueNameExists(name)) {
      return false;
    }

    delete this._queues[name];

    // remove queue from all users in it
    for (let memberId in Object.keys(this._memberRegisteredQueueMap)) {
      this._memberRegisteredQueueMap[memberId].delete(name);
    }

    return true;
  }

  getQueue(name: string) {
    return this._queues[name] as Queue | undefined;
  }

  get allQueueNames() {
    return Object.values(this._queues).map((queue) => queue.name);
  }

  updateQueueName(queueName: string, newName: string) {
    if (!this.queueNameExists(queueName)) {
      return false;
    }

    const queue = this._queues[queueName];

    delete this._queues[queueName];
    this._queues[newName] = queue;

    for (let id of Object.keys(this._memberRegisteredQueueMap)) {
      // try to remove the old name from every member,
      // on successful delete, add the new name in
      if (this._memberRegisteredQueueMap[id].delete(queueName)) {
        this._memberRegisteredQueueMap[id].add(newName);
      }
    }

    queue.__dangerouslySetNameNoPropagate(newName);

    return true;
  }

  /**
   * Registers a member to a queue.
   *
   * Not to be confused with adding, which actually puts them as an active
   * member in the queue.
   *
   * When a user runs the /add or /del command without passing any options,
   * they will be added or removed as active members from any queues they are
   * registered to.
   *
   * @returns true if the member successfully registered to the queue, false if the queue
   *          does not exist or the member was already registered
   */
  register(member: User, queueName: string) {
    if (!this.queueNameExists(queueName)) {
      return false;
    }

    const memberId = member.id;

    if (!this._memberRegisteredQueueMap[memberId]) {
      this._memberRegisteredQueueMap[memberId] = new Set<string>();
    }

    return this._memberRegisteredQueueMap[memberId].add(queueName);
  }

  /**
   * Unregisters a member from a queue.
   *
   * Not to be confused with deleting ("deling", "del", etc), which removes
   * them as an active member of the queue.
   *
   * When a user runs the /add or /del command without passing any options,
   * they will be added or removed as active members from any queues they are
   * registered to.
   *
   * @returns true if the member was successfully unregistered from the queue,
   *          false if the queue does not exist or the member was never registered
   */
  unregister(member: User, queueName: string) {
    if (!this.queueNameExists(queueName)) {
      return false;
    }

    const memberId = member.id;

    if (!this._memberRegisteredQueueMap[memberId]) {
      return false;
    }

    return this._memberRegisteredQueueMap[memberId].delete(queueName);
  }

  addMemberToAllRegisteredQueues(member: User) {
    const queuesAdded: string[] = [];

    this.getMemberRegisteredQueues(member).forEach((queue) => {
      if (queue.addMember(member)) {
        queuesAdded.push(queue.name);
      }
    });

    return queuesAdded;
  }

  delMemberFromAllRegisteredQueues(member: User) {
    const queuesDeled: string[] = [];

    this.getMemberRegisteredQueues(member).forEach((queue) => {
      if (queue.delMember(member)) {
        queuesDeled.push(queue.name);
      }
    });

    return queuesDeled;
  }
}
