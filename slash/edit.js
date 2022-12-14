module.exports = {
    name: 'edit',
    description: ' Edit a giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'Setting time of mentioned giveaway. Eg. 1h sets the current giveaway to end after an hour!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: '**<:error:992024170785427537> Get Manage_Message Perms To Start Giveaways!!**',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the giveaway
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `No Giveaway Has Been Found With ID: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `<:success:992024105975037992> Giveaway Edited!`,
            ephemeral: true
        });
    }

};
