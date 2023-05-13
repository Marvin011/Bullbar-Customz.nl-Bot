const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Gives you information about a member")
    .addUserOption(option => option.setName("member").setDescription("member").setRequired(true)),
    async execute(interaction) {

        const user = interaction.options.getUser("user") || interaction.user;
        const member = interaction.options.getMember("member");
        const icon = user.displayAvatarURL();
        const tag = user.tag
          
        

        const userinfo = new EmbedBuilder()
        .setColor("ffffff")
        .setThumbnail(member.user.avatarURL({dynamic: true}))
        .addFields([
            {
                name: "Member",
                value: `${member}`,
                inline: false
            },
        
            {
                name: "ID",
                value: user.id,
                inline: true
            },

            {
                name: "Roles",
                value: `${member.roles.cache.map(r => r).join("")}`,
                inline: false
            },

            {
                name: "Account created",
                value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`,
                inline: true
            },

            {
                name: "Server joined",
                value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
                inline: true
            },
        ])
        .setTimestamp(interaction.createdAt)
        .setImage("https://media.discordapp.net/attachments/1094303110152855592/1095724432800092331/IMG_4842.png?width=1440&height=405")
        .setFooter({text: user.username, iconURL: user.displayAvatarURL()})

        await interaction.reply({ embeds: [userinfo] });
    }
}    
