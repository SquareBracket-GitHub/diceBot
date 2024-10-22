const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const crypto = require("crypto");
const moment = require("moment");
const { dice } = require("../functions/rolling.js");

module.exports = {
    /* Create a new SlashCommandBuilder object. */
    data: new SlashCommandBuilder()
        .setName('특수주사위')
        .setDescription('특수주사위를 굴립니다.')
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
        .addStringOption(option => option
            .setName('effect')
            .setDescription('특수 주사위의 효과를 선택합니다.')
            .addChoices([
                {name: '플러스', value: 'plus'},
                {name: '마이너스', value: 'minus'}
            ])
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('effect-num')
            .setDescription('효과의 수, 정도를 선택합니다.')
            .setMinValue(1)
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
        ),
     /* Execute the slash command when it is called by a user. */
    async execute(interaction) {
        function rollsNumber(num) {
            if (num > 1) return String(num);
            else if (num <= 1) return '';
        }

        const options = [
            {name: 'type', value: null},        //돌릴 주사위
            {name: 'times', value: 1},          //돌릴 횟수
            {name: 'ephemeral', value: false},
            {name: 'effect', value: null},
            {name: 'effect-num', value: null}
        ];

        const interactionOptions = interaction.options._hoistedOptions;

        for (i=0; i<=options.length-1; i++) {
            interactionOptions.forEach(async option => {
                if (option.name == options[i].name) options[i].value = option.value;
            });
        };

        const randomValue = dice(options[0].value, options[1].value, options[3].value, options[4].value);

        let sign;
        let color = '#F8F1C8';
        let diceColor;

        if (options[3].value == 'plus') { sign = '+'; diceColor = '적색의'; color = 'DD2E44' }
        if (options[3].value == 'minus') { sign = '-'; diceColor = '청색의'; color = '54ACEF' }

        var embedDescription;                                           //임배드 Description
        if (options[1].value > 1) {
            var string = '';
            randomValue.values.forEach((num, i) => {                    //여러번 돌렸을 시의 임배드 Description
                string += '`' + num + '`';
                if (i + 1 == randomValue.values.length) string += ` = **${randomValue.total}** *${sign} ${options[4].value}* = **${randomValue.effectedTotal}**`;
                else string += ' + ';
            });
            embedDescription = '>>> ' + string;
        } else embedDescription = `>>> **${randomValue.total}** *${sign} ${options[4].value}* = **${randomValue.effectedTotal}**`;        //한 번 돌렸을 시의 임배드 Description

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username + '님의 ' + diceColor + ' ' + rollsNumber(options[1].value) + options[0].value, iconURL: interaction.user.avatarURL()})
            .setDescription(embedDescription)
            .setColor(color);
        
        await interaction.reply({ content: '타라락.', embeds: [embed], ephemeral: options[2].value });
        console.log(`[${moment(new Date()).format('YY/MM/DD hh:mm')}] ${interaction.user.username} | ${rollsNumber(options[1].value)}${options[0].value} | ${randomValue.total} | ${options[2].value} | ${options[3].value} | ${options[4].value}`);
        // ex) Steve rolled the d20 dice, and the number that came up was 12.
    }
}