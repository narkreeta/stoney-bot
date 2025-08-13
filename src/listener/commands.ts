import {Client} from "discord.js";
import {MEMBER_ROLE} from "../config/vars";

const PREFIX = "!stoney";

export default function commandListener(client: Client) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return; // ignore bots

        if (message.content.startsWith(PREFIX)) {
            const args = message.content.slice(PREFIX.length).trim().split(/ +/);
            const command = args.shift()?.toLowerCase();

            switch (command) {
                case "members": {
                    await message.guild?.members.fetch();
                    const role = message.guild?.roles.cache.get(MEMBER_ROLE);
                    if (!role) {
                        await message.channel.send(`❌ Role with ID "${MEMBER_ROLE}" not found.`);
                        return;
                    }
                    const count = role.members.size;
                    await message.channel.send(`👥 Members : **${count}**`);
                    break;
                }
                case "time": {
                    const utcTime = new Date().toUTCString();
                    await message.channel.send(`🕒 UTC Time: **${utcTime}**`);
                    break;
                }
                default:
                    await message.channel.send(`❌ Unknown command. Try \`!stoney members\` or \`!stoney time\`.`);
            }
        }
    });
}
