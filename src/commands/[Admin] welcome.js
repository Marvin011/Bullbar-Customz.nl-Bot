const { SlashCommandBuilder } = require("@discordjs/builders");
const {EmbedBuilder, Embed, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("welcome")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(option => option.setName("member").setDescription("member").setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.options.getMember("member");

        const welcome = new EmbedBuilder()
        .setColor("ffffff")
        .setTitle(`Welcome 🥳 🎉`)
        .addFields([
            {
                name: "New member",
                value: `${member} is a new Club Member `,
                inline: false
            },
        ])
        .setImage("https://media.discordapp.net/attachments/1103408403474288741/1103411645549662240/1.jpg?width=1440&height=533")
        .setFooter({text: user.username, iconURL: user.displayAvatarURL()})
        .setTimestamp(interaction.createdAt)

        const message = await interaction.reply({ embeds: [welcome], fetchReply: true });
        message.react("🥳");
        message.react("🎉") 
    }
}    