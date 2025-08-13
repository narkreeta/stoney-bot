import dotenv from "dotenv";
import client from "./config/client";
import readyListener from "./listener/ready";
import guildMemberAddListener from "./listener/guildMemberAdd";
import guildMemberRemoveListener from "./listener/guildMemberRemove";

dotenv.config();

// Register listeners
readyListener(client);
guildMemberAddListener(client);
guildMemberRemoveListener(client);

// Login
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log("🚀 Bot started...");
});
