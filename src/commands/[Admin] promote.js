const { SlashCommandBuilder } = require("@discordjs/builders");
const {EmbedBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("promote")
    .setDescription("Member joined the Staff")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addUserOption(option => option.setName("member").setDescription("The member").setRequired(true))
    .addRoleOption(option => option.setName("role").setDescription("The role").setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.options.getMember("member");
        const role = interaction.options.getRole("role");

        const promote = new EmbedBuilder()
        .setColor("ffffff")
        .setTitle(`Congratulations 🥳 🎉`)
        .addFields([
            {
                name: "New promotion",
                value: `${member} has been promoted to ${role}`,
                inline: false
            },
        ])
        .setImage("https://media.discordapp.net/attachments/1103408403474288741/1106860810577391616/Congratulations.png?width=1440&height=533")
        .setFooter({text: user.username, iconURL: user.displayAvatarURL()})
        .setTimestamp(interaction.createdAt)

        const message = await interaction.reply({ embeds: [promote], fetchReply: true });
        message.react("🥳");
        message.react("🎉")
    }
}    


    