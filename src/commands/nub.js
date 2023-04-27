const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nub")
		.setDescription("nub!"),
	async execute(interaction) {
		await interaction.reply("in the Bullbar Staff Team are only nubs");

	}
}