import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";
import { formatQueueSettings } from "../queue/Queue";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("View queue details")
    .addStringOption((option) =>
      option
        .setName("queue")
        .setDescription("Queue to view details for")
        .setRequired(true)
    ) as SlashCommandBuilder,
  execute: (interaction) => {
    const paramQueueName = interaction.options.getString("queue", true);
    const queue = interaction.client.queueManager.getQueue(paramQueueName);

    interaction.reply({
      embeds: [
        queue
          ? new EmbedBuilder()
              .setTitle(queue.name)
              .setDescription(formatQueueSettings(queue.settings))
              .setColor(getThemeColor("success"))
          : new EmbedBuilder()
              .setDescription(`No queue with name ${paramQueueName} found`)
              .setColor(getThemeColor("error")),
      ],
      ephemeral: true,
    });
  },
  cooldown: 1,
};

export default command;
