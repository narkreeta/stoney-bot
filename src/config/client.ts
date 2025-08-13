import {Client, GatewayIntentBits} from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Required for member join/leave
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


export default client;