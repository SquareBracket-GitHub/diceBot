//This event makes emoji bigger.
const fs = require('fs');
const { Events, EmbedBuilder } = require("discord.js");

module.exports = {
    event: Events.MessageCreate,
    once: false,
    async execute(interaction) {
        const content = interaction.content;
        const regex = /^<:[^:<>]+:([^:<>]+)>$/;

        if (!regex.test(content)) return;

        const match = regex.exec(content);
        const url = `https://cdn.discordapp.com/emojis/${match[1]}.png`;

        const embed = new EmbedBuilder()
            .setAuthor({name: interaction.author.username, iconURL: interaction.author.avatarURL()})
            .setImage(url)
            .setColor('#2B2D31');
        await interaction.channel.send({ embeds: [embed] });
        await interaction.delete();
    }
}