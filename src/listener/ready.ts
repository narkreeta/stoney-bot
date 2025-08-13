import { Client } from "discord.js";

export default function readyListener(client: Client) {
    client.once("ready", () => {
        console.log(`✅ Logged in as ${client.user?.tag}`);
    });
}
