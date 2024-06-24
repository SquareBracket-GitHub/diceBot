const { Events, PermissionsBitField } = require("discord.js");
const { isNightTime } = require("../functions/loungeFun.js");
const { TEST_GUILD, LOUNGE } = require("../../configs/config.js");

module.exports = {
    event: Events.ClientReady, /* This object exports an event listener for the Discord.js 'ClientReady' event. */
    once: true, /* The 'once' property is set to true, indicating that the event listener should only be executed once. */
    async execute(client) {
        const channel = await client.channels.fetch(LOUNGE);
        const guild = await client.guilds.fetch(TEST_GUILD);

        var interval = setInterval(function () {
            if (channel.permissionsFor(guild.roles.everyone).has([PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel])) {
                //night
                if (isNightTime()) return; //still night
                channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: false, ViewChannel: false }); //to day from night
            }
            else {
                //day
                if (!isNightTime()) return; //still day
                channel.permissionOverwrites.create(channel.guild.roles.everyone, { SendMessages: true, ViewChannel: true }); //to night from day
            }
        }, 1 * 1000);
    }
}