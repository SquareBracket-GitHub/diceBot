const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const crypto = require("crypto");

module.exports = {
    /* Create a new SlashCommandBuilder object. */
    data: new SlashCommandBuilder()
        .setName('주사위')
        .setDescription('주사위를 굴립니다.')
        .addSubcommand(subCommand => subCommand
            .setName('d2')
            .setDescription('d2 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('d4')
            .setDescription('d4 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('d6')
            .setDescription('d6 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('d10')
            .setDescription('d10 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('d20')
            .setDescription('d20 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('dp')
            .setDescription('dp(d%) 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        )
        .addSubcommand(subCommand => subCommand
            .setName('d120')
            .setDescription('d120 주사위를 굴립니다.')
            .addNumberOption(option => option
                .setName('횟수')
                .setDescription('주사위를 굴릴 횟수를 정합니다.')
                .setMinValue(1).setMaxValue(10)
            )
        ),
     /* Execute the slash command when it is called by a user. */
    async execute(interaction) {
        function rollsNumber(num) {
            if (num > 1) return String(num);
            else if (num <= 1) return '';
        }

        const dices = {
            d2: 2,
            d4: 4,
            d6: 6,
            d10: 10,
            d20: 20,
            dp: 100,
            d120: 120
        }
        const diceType = interaction.options._subcommand;
        let rolls;
        if (!interaction.options._hoistedOptions[0]) rolls = 1;
        else rolls = interaction.options._hoistedOptions[0].value;
        
        let rolledNumber = 0;
        let rolledArr = [];

        for (i=0; i<rolls; i++) {
            const randomBytes = crypto.randomBytes(1);
            const random = (randomBytes[0] % dices[diceType]) + 1;
            // const random = crypto.randomInt(1, dices[diceType] + 1);
            rolledArr.push(random);
            rolledNumber += random;
        }

        var embedDescription;
        if (rolls > 1) {
            var string = '';
            rolledArr.forEach((num, i) => {
                string += '`' + num + '`';
                if (i + 1 == rolledArr.length) string += ` = **${rolledNumber}**`;
                else string += ' + ';
            });
            embedDescription = '>>> ' + string;
        } else embedDescription = `>>> **${rolledNumber}**`;

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username + '님의 ' + rollsNumber(rolls) + diceType, iconURL: interaction.user.avatarURL()})
            .setDescription(embedDescription)
            .setColor('White');
        
        await interaction.reply({ content: '타라락.', embeds: [embed] });
        console.log(`${interaction.user.username} rolled the ${rollsNumber(rolls)}${diceType} dice, and the number that came up was ${rolledNumber}.`);
        // ex) Steve rolled the d20 dice, and the number that came up was 12.
    }
}

// const embed = new EmbedBuilder()
// .setAuthor({ name: interaction.user.username + '님의 ' + rollsNumber(rolls) + diceType, iconURL: interaction.user.avatarURL()})
// .setDescription(embedDescription)
// .setColor('White');