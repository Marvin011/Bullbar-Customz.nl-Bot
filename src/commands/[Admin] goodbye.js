const { SlashCommandBuilder } = require("@discordjs/builders");
const {EmbedBuilder, Embed, PermissionFlagsBits, PermissionsBitField, chane} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("goodbye")
    .setDescription("goodbye")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(option => option.setName("member").setDescription("member").setRequired(true))
    .addRoleOption(option => option.setName("role").setDescription("role").setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.options.getMember("member");
        const role = interaction.options.getRole("role");

        const goodbye = new EmbedBuilder()
        .setColor("ffffff")
        .setTitle(`Goodbye 😥`)
        .addFields([
            {
                name: "Leave",
                value: `${member} leaves ${role}`,
                inline: false
            },
        ])
        .setImage("https://media.discordapp.net/attachments/1103408403474288741/1104765351893413898/Goodbye.jpg?width=1440&height=534")
        .setFooter({text: user.username, iconURL: user.displayAvatarURL()})
        .setTimestamp(interaction.createdAt)
        
        const message = await interaction.reply({ embeds: [goodbye], fetchReply: true });
        message.react("😥")
    }
}    
