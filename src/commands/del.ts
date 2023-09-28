import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { getThemeColor } from "../functions";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("del")
    .setDescription("Remove yourself from all or specified queues."),
  execute: (interaction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: "PugBot" })
          .setDescription(
            `${interaction.user.displayName} has been removed from {{queue}}.`
          )
          .setColor(getThemeColor("success")),
      ],
    });
  },
  cooldown: 10,
};

export default command;
