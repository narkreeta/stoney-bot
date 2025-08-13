import {Client, GuildMember, GatewayIntentBits, TextChannel, PartialGuildMember} from "discord.js";
import dotenv from "dotenv";
import {EXIT_CHANNEL, WELCOME_CHANNEL} from "./vars";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Required for member join/leave
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user?.tag}`);
});

client.on('guildMemberAdd', async (member: GuildMember) => {
    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL) as TextChannel | undefined;
    if (channel) {
        await channel.send(`🎉 Welcome to the server, ${member}!`);
    }
});

client.on("guildMemberRemove", async (member: GuildMember | PartialGuildMember) => {
    const channel = member.guild.channels.cache.get(EXIT_CHANNEL) as TextChannel | undefined;
    if (channel) {
        await channel.send(`👋 ${member.user.tag} has left the server.`);
    }
});

client.login(process.env.DISCORD_TOKEN);
