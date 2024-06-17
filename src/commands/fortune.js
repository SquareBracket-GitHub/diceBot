const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { dice } = require("../functions/rolling.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('운세')
        .setDescription('오늘의 운세를 행운의 숫자로 나타냅니다.'),
    async execute(interaction) {
        const randomValue = dice('dp', 1);

        let message;

        if (randomValue.total <= 20) {
            message = "당신은 충분히 잘하고 있습니다.";
        } else if (randomValue.total <= 40) {
            message = "오늘은 조금 더 힘을 내도 좋을 것 같습니다.";
        } else if (randomValue.total <= 60) {
            message = "좋은 하루가 될 것 같군요. 오늘도 응원합니다.";
        } else if (randomValue.total <= 80) {
            message = "당신의 성공을 기원합니다.";
        } else {
            message = "진심을 다하기에 딱 맞는 하루입니다. 당신을 보여주세요.";
        }

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username + '님의 운세', iconURL: interaction.user.avatarURL()})
            .setDescription('> ' + randomValue.total +'\n\n' + message)
            .setColor('#F8F1C8');
        
        await interaction.reply({embeds: [embed]});
    }
}