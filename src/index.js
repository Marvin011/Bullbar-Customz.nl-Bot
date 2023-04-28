require("dotenv").config()
const { ActivityType } = require("discord.js")
const fs = require("fs")
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { channel } = require("diagnostics_channel")

const client = new Client({intents: [GatewayIntentBits.Guilds]})

client.commands = new Collection

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

commandFiles.forEach((commandFile) => {
	const command = require(`./commands/${commandFile}`);
	client.commands.set(command.data.name, command);
})

client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({
        name: "Cooming Soon",
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    })
})

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) return

    const command = client.commands.get(interaction.commandName)

    if(command) {

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if(interaction.deferred || interaction.replied) {
                interaction.editReply("There was an error while executing this command!")
            }else {
                interaction.reply("There was an error while executing this command!")
            }
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN)