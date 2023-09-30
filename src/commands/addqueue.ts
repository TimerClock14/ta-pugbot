import {
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { getThemeColor } from "../functions";
import type { SlashCommand } from "../types";
import { generateDefaultPickOrder } from "../queue/Queue";

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName("addqueue")
    .setDescription("Add a new queue.")
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("The name of the new queue")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("size")
        .setDescription(
          "Number of players it takes for this queue to begin a game"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("pickorder")
        .setDescription("The picking order for this queue")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: (interaction) => {
    const name = interaction.options.getString("name", true);
    const size = interaction.options.getInteger("size", true);

    const pickOrder =
      interaction.options.getString("pickOrder", false) ??
      generateDefaultPickOrder(size);

    const result = interaction.client.queueManager.createQueue(name, {
      size,
      pickOrder,
    });

    if (result) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`New Queue "${name}" successfully created.`)
            .setColor(getThemeColor("success")),
        ],
      });
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${name} already exists`)
            .setColor(getThemeColor("error")),
        ],
        ephemeral: true,
      });
    }
  },
  cooldown: 10,
};

export default command;
