import {
    MessageReaction,
    PartialMessageReaction,
    User,
    PartialUser, Client,
} from "discord.js";
import {MEMBER_ROLE, RULES_MESSAGE} from "../config/vars";

export default function messageReactionAddListener(client: Client) {
    client.on(
        "messageReactionAdd",
        async (
            reaction: MessageReaction | PartialMessageReaction,
            user: User | PartialUser
        ) => {
            // Ignore bot reactions
            if (user.bot) return;

            // Handle uncached reactions
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (err) {
                    console.error("❌ Failed to fetch reaction:", err);
                    return;
                }
            }

            // Handle uncached users
            if (user.partial) {
                try {
                    await user.fetch();
                } catch (err) {
                    console.error("❌ Failed to fetch user:", err);
                    return;
                }
            }

            // Make sure we’re looking at the rules message
            if (
                reaction.message.id === RULES_MESSAGE &&
                reaction.emoji.name === "✅"
            ) {
                const guild = reaction.message.guild;
                if (!guild) return;

                try {
                    const member = await guild.members.fetch(user.id);
                    await member.roles.add(MEMBER_ROLE);
                    console.log(`✅ Added role to ${member.user.tag}`);
                } catch (err) {
                    console.error("❌ Failed to add role:", err);
                }
            }
        }
    );

    client.on(
        "messageReactionRemove",
        async (
            reaction: MessageReaction | PartialMessageReaction,
            user: User | PartialUser
        ) => {
            if (user.bot) return;

            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (err) {
                    console.error("❌ Failed to fetch reaction:", err);
                    return;
                }
            }
            if (user.partial) {
                try {
                    await user.fetch();
                } catch (err) {
                    console.error("❌ Failed to fetch user:", err);
                    return;
                }
            }

            if (reaction.message.id !== RULES_MESSAGE && reaction.emoji.name !== "✅") return;


            const guild = reaction.message.guild;
            if (!guild) return;

            try {
                const member = await guild.members.fetch(user.id);
                await member.roles.remove(MEMBER_ROLE);
                console.log(`❌ Removed role ${MEMBER_ROLE} from ${member.user.tag}`);
            } catch (err) {
                console.error("❌ Failed to remove role:", err);
            }
        }
    );
}
