import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("add")
    .setDescription("Add yourself to all queues or specified queue."),
  execute: (interaction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${interaction.user.displayName} has been added to {{queue}}.`
          )
          .setColor(getThemeColor("success")),
      ],
    });
  },
  cooldown: 10,
};

export default command;
