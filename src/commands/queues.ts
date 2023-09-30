import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("queues")
    .setDescription("List all the queues."),
  execute: (interaction) => {
    const allQueues = interaction.client.queueManager.allQueueNames;

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Queues")
          .setDescription(allQueues.join("\n"))
          .setColor(getThemeColor("success")),
      ],
      ephemeral: true,
    });
  },
  cooldown: 1,
};

export default command;
