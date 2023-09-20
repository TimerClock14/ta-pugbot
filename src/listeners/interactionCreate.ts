import { Client, BaseInteraction, Interaction } from "discord.js";

const handleSlashCommand = async (
  client: Client,
  interaction: BaseInteraction
) => {
  // handle slash command here
};

export const interactionCreateListener = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};
