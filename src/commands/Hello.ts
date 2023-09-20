import { BaseInteraction, Client, ApplicationCommandType } from 'discord.js';
import { Command } from '../Command';

export const Hello: Command = {
  name: 'hello',
  description: 'returns a greeting',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: BaseInteraction) => {
    const content = "Hello there!";

    // TODO: guide i was following seems to have been using a different version of discord.js
  }
}