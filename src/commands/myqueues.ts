import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("myqueues")
    .setDescription("Manage the queues you are registered to."),
  execute: (interaction) => {
    const allQueues = interaction.client.queueManager.allQueueNames;
    const registeredQueues =
      interaction.client.queueManager.getMemberRegisteredQueueNames(
        interaction.user
      );

    const queueButtons = allQueues.map((queue) => {
      const button = new ButtonBuilder().setCustomId(queue).setLabel(queue);

      if (registeredQueues.has(queue)) {
        button.setEmoji(":white_check_mark:");
      }

      return button;
    });

    const queuesRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      queueButtons
    );

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Your Queues")
          .setDescription(
            `${interaction.user.displayName} has joined {{queue}}.`
          )
          .setColor(getThemeColor("success")),
      ],
      components: [queuesRow],
      ephemeral: true,
    });
  },
  cooldown: 1,
};

export default command;
