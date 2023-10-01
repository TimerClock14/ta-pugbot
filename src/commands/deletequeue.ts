import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("deletequeue")
    .setDescription("Deletes a queue.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the new queue")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: (interaction) => {
    const name = interaction.options.getString("name", true);

    const result = interaction.client.queueManager.removeQueue(name);

    if (result) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Queue "${name}" successfully deleted.`)
            .setColor(getThemeColor("success")),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`No queue with the name "${name}" found.`)
            .setColor(getThemeColor("error")),
        ],
        ephemeral: true,
      });
    }
  },
  cooldown: 1,
};

export default command;
