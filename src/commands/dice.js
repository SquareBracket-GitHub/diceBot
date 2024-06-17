const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const crypto = require("crypto");
const moment = require("moment");
const { dice } = require("../functions/rolling.js");

module.exports = {
    /* Create a new SlashCommandBuilder object. */
    data: new SlashCommandBuilder()
        .setName('주사위')
        .setDescription('주사위를 굴립니다.')
        .addStringOption(option => option
            .setName('type')
            .setDescription('주사위의 종류를 선택합니다.')
            .addChoices([
                {name: 'd2', value: 'd2'},
                {name: 'd4', value: 'd4'},
                {name: 'd6', value: 'd6'},
                {name: 'd10', value: 'd10'},
                {name: 'd20', value: 'd20'},
                {name: 'dp', value: 'dp'},
                {name: 'd120', value: 'd120'}
            ])
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('times')
            .setDescription('주사위를 굴릴 횟수를 정합니다.')
            .setMinValue(1)
            .setMaxValue(10)
        )
        .addBooleanOption(option => option
            .setName('ephemeral')
            .setDescription('True로 설정할 경우 주사위 결과가 자신에게만 보여집니다.')
        )
        // .setName('주사위')
        // .setDescription('주사위를 굴립니다.')
        // .addSubcommand(subCommand => subCommand
        //     .setName('d2')
        //     .setDescription('d2 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('d4')
        //     .setDescription('d4 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('d6')
        //     .setDescription('d6 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('d10')
        //     .setDescription('d10 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('d20')
        //     .setDescription('d20 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('dp')
        //     .setDescription('dp(d%) 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        // .addSubcommand(subCommand => subCommand
        //     .setName('d120')
        //     .setDescription('d120 주사위를 굴립니다.')
        //     .addNumberOption(option => option
        //         .setName('횟수')
        //         .setDescription('주사위를 굴릴 횟수를 정합니다.')
        //         .setMinValue(1).setMaxValue(10)
        //     )
        // )
        ,
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

        const options = [
            {name: 'type', value: null}, //돌릴 주사위
            {name: 'times', value: 1}, //돌릴 횟수
            {name: 'ephemeral', value: false}
        ];

        const interactionOptions = interaction.options._hoistedOptions;

        for (i=0; i<=options.length-1; i++) {
            interactionOptions.forEach(async option => {
                if (option.name == options[i].name) options[i].value = option.value;
            });
        };

        const randomValue = dice(options[0].value, options[1].value);

        var embedDescription;                                      //임배드 Description
        if (options[1].value > 1) {
            var string = '';
            randomValue.values.forEach((num, i) => {                        //여러번 돌렸을 시의 임배드 Description
                string += '`' + num + '`';
                if (i + 1 == randomValue.values.length) string += ` = **${randomValue.total}**`;
                else string += ' + ';
            });
            embedDescription = '>>> ' + string;
        } else embedDescription = `>>> **${randomValue.total}**`;       //한 번 돌렸을 시의 임배드 Description

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username + '님의 ' + rollsNumber(options[1].value) + options[0].value, iconURL: interaction.user.avatarURL()})
            .setDescription(embedDescription)
            .setColor('#F8F1C8');
        
        await interaction.reply({ content: '타라락.', embeds: [embed], ephemeral: options[2].value });
        console.log(`[${moment(new Date()).format('YY/MM/DD hh:mm')}] ${interaction.user.username} | ${rollsNumber(options[1].value)}${options[0].value} | ${randomValue.total} | ${options[2].value}`);
        // ex) Steve rolled the d20 dice, and the number that came up was 12.
    }
}

// const embed = new EmbedBuilder()
// .setAuthor({ name: interaction.user.username + '님의 ' + rollsNumber(rolls) + diceType, iconURL: interaction.user.avatarURL()})
// .setDescription(embedDescription)
// .setColor('White');