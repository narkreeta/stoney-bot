import {Client, GuildMember, TextChannel} from "discord.js";
import {WELCOME_CHANNEL} from "../config/vars";

export default function guildMemberAddListener(client: Client) {
    client.on("guildMemberAdd", async (member: GuildMember) => {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL) as TextChannel | undefined;
        if (channel) {
            await channel.send(`🎉 Welcome to the server, ${member}!`);
        }
    });
}
