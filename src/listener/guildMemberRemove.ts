import {Client, GuildMember, PartialGuildMember, TextChannel} from "discord.js";
import {EXIT_CHANNEL} from "../config/vars";

export default function guildMemberRemoveListener(client: Client) {
    client.on("guildMemberRemove", async (member: GuildMember | PartialGuildMember) => {
        const username = member.user?.tag ?? member.displayName ?? "Unknown Member";
        const channel = member.guild.channels.cache.get(EXIT_CHANNEL) as TextChannel | undefined;
        if (channel) {
            await channel.send(`👋 ${username} has left the server.`);
        }
    });
}
