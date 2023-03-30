const {
        SlashCommandBuilder,
        EmbedBuilder,
        Collection
    } = require("discord.js"),
    work_options = [
        ["You wrote a book", 1000, 5000],
        ["You painted a portrait", 500, 2000],
        ["You repaired a car engine", 500, 3000],
        ["You wrote a software program", 2000, 10000],
        ["You designed a logo", 200, 1000],
        ["You installed a solar panel system", 2000, 10000],
        ["You repaired a leaking roof", 500, 3000],
        ["You filmed a commercial", 1000, 5000],
        ["You created a social media campaign", 500, 2000],
        ["You baked a wedding cake", 500, 3000],
        ["You wrote a screenplay", 1000, 5000],
        ["You built a website", 1000, 5000],
        ["You designed a garden", 500, 2000],
        ["You repaired a broken fence", 200, 1000],
        ["You cooked a gourmet meal", 500, 3000],
        ["You wrote a research paper", 1000, 5000],
        ["You cleaned a house", 200, 1000],
        ["You created a marketing plan", 500, 2000],
        ["You repaired a malfunctioning computer", 500, 3000],
        ["You designed a custom piece of furniture", 1000, 5000],
        ["You taught a yoga class", 200, 1000],
        ["You organized a charity event", 1000, 5000],
        ["You painted a room", 200, 1000],
        ["You planned a wedding", 1000, 5000],
        ["You built a treehouse", 500, 3000],
        ["You wrote a grant proposal", 1000, 5000],
        ["You designed a kitchen", 2000, 10000],
        ["You repaired a broken refrigerator", 500, 3000],
        ["You made a sculpture", 500, 2000],
        ["You wrote a business plan", 1000, 5000],
        ["You created a mobile app", 2000, 10000],
        ["You repaired a leaky faucet", 200, 1000],
        ["You filmed a short movie", 1000, 5000],
        ["You designed a wedding dress", 2000, 10000],
        ["You painted a landscape", 500, 2000],
        ["You taught a cooking class", 200, 1000],
        ["You organized a music festival", 1000, 5000],
        ["You repaired a broken dishwasher", 500, 3000],
        ["You designed a home theater", 2000, 10000],
        ["You wrote a scientific paper", 1000, 5000],
        ["You built a bicycle", 500, 3000],
        ["You created a new product", 1000, 5000],
        ["You designed a book cover", 200, 1000],
        ["You repaired a broken television", 500, 3000],
        ["You wrote a poem", 200, 1000],
        ["You filmed a music video", 1000, 5000],
        ["You designed a brochure", 200, 1000],
        ["You cooked a gourmet meal for a party", 1000, 5000],
        ["You repaired a broken washing machine", 500, 3000],
        ["You sorted mail", 50, 200],
        ["You folded clothes", 50, 200],
        ["You swept the floors", 50, 200],
        ["You stocked shelves", 50, 200],
        ["You assembled boxes", 50, 200],
        ["You answered phones", 50, 200],
        ["You cleaned windows", 50, 200],
        ["You packed orders", 50, 200],
        ["You operated a cash register", 50, 200],
        ["You watered plants", 50, 200],
        ["You dressed up as a mascot", 100, 500],
        ["You searched for lost pets", 200, 1000],
        ["You wrote someone's dating profile", 50, 200],
        ["You delivered singing telegrams", 100, 500],
        ["You rented out your swimming pool", 50, 200],
        ["You sold handmade jewelry on the street", 100, 500],
        ["You provided pet therapy services", 50, 200],
        ["You cleaned up crime scenes", 200, 1000],
        ["You decorated Christmas trees", 100, 500],
        ["You walked dogs in fancy attire", 50, 200],

        // New jobs added 08/03/23
        ["You designed a mobile game", 2000, 10000],
        ["You created an online course", 1000, 5000],
        ["You provided graphic design services", 500, 3000],
        ["You wrote a technical manual", 1000, 5000],
        ["You edited a feature film", 2000, 10000],
        ["You provided legal services", 5000, 20000],
        ["You translated a book", 1000, 5000],
        ["You created a podcast", 500, 3000],
        ["You provided financial planning services", 2000, 10000],
        ["You designed and built a custom home", 50000, 200000],
        ["You provided executive coaching services", 5000, 20000],
        ["You designed a fashion line", 5000, 20000],
        ["You provided interior design services", 1000, 5000],
        ["You created a virtual reality experience", 5000, 20000],
        ["You provided personal training services", 500, 3000],
        ["You provided voiceover services", 200, 1000],
        ["You created a computer game", 5000, 20000],
        ["You provided wedding planning services", 2000, 10000],
        ["You provided social media management services", 1000, 5000],
        ["You edited a video", 500, 3000],
        ["You designed a website logo", 200, 1000],
        ["You created a 3D animation", 1000, 5000],
        ["You wrote a product review", 50, 200],
        ["You performed in a theater production", 500, 3000],
        ["You designed a custom t-shirt", 100, 500],
        ["You created a graphic novel", 1000, 5000],
        ["You organized a museum exhibit", 1000, 5000],
        ["You recorded a voiceover", 200, 1000],
        ["You provided hair and makeup services for a photoshoot", 500, 3000],
        ["You developed a mobile game", 2000, 10000],
        ["You organized a food festival", 1000, 5000],
        ["You designed an advertising billboard", 1000, 5000],
        ["You provided translation services", 200, 1000],
        ["You wrote a travel guidebook", 1000, 5000],
        ["You designed a new product package", 200, 1000],
        ["You provided financial planning services", 1000, 5000],
        ["You created a podcast episode", 100, 500],
        ["You designed a restaurant menu", 200, 1000],
        ["You provided personal shopping services", 200, 1000],
        ["You organized a comedy show", 500, 3000],
        ["You designed a greeting card", 50, 200],
        ["You provided academic tutoring services", 200, 1000],
        ["You wrote a movie review", 50, 200],
        ["You designed an e-book cover", 100, 500],
        ["You provided life coaching services", 500, 3000],
        ["You created a virtual reality experience", 1000, 5000],
        ["You designed a board game", 500, 3000],
        ["You provided voice lessons", 200, 1000],
        ["You organized a charity auction and may have embezzled funds", 0, 1],
        ["You provided wedding planning services", 1000, 5000],

        // Faction specific jobs
        ["**FACTION:** You helped a local radical group of armed men make improvised explosive devices", 200, 1000],
        ["**FACTION:** You joined a mercenary group and were sent to fight in a war", 500, 3000],
        ["**FACTION:** You gave the location of an insurgent group to NATO forces", 1000, 5000],
        ["**FACTION:** You helped a local warlord with his war efforts", 500, 3000],
        ["**FACTION:** You bribed a political figure to leave the insurgents alone (+25% income for other faction related commands)", -1000, -5000],
        ["**FACTION:** You received money from a local warlord to keep the authorities away", 500, 3000],
        ["**FACTION:** You infiltrated a rival faction and provided valuable intel to your own faction", 1000, 5000],
        ["**FACTION:** You led a successful raid on a rival faction's base", 1500, 8000],
        ["**FACTION:** You assassinated a key member of a rival faction", 2000, 10000],
        ["**FACTION:** You stole weapons and supplies from a rival faction's warehouse", 500, 3000],
        ["**FACTION:** You negotiated a peace treaty between your faction and a rival faction (:green_circle: 10% more income on your next 5 faction related jobs)", -500, 5000],
        ["**FACTION:** You defected to a rival faction and provided them with valuable information (:red_circle: 25% less income on your next 5 faction related jobs)", -1000, -5000],
        ["**FACTION:** You were captured by a rival faction and had to be rescued by your own faction", -500, -2000],
        ["**FACTION:** You set up a profitable black market operation for your faction", 1000, 5000],
        ["**FACTION:** You organized a successful ambush on a rival faction's convoy", 1500, 8000],
        ["**FACTION:** You provided medical aid to wounded members of your faction", 500, 2000],
        ["**FACTION:** You were tasked with training new recruits for your faction", 500, 3000],
        ["**FACTION:** You were accused of betraying your faction and had to prove your loyalty (:red_circle: 25% less income on your next 5 faction related jobs)", -1000, -5000],
        ["**FACTION:** You were tasked with destroying a rival faction's communication infrastructure", 1000, 5000],
        ["**FACTION:** You organized a successful jailbreak of your faction's members", 2000, 10000],
        ["**FACTION:** You were assigned to protect a high-ranking member of your faction", 500, 3000],
        ["**FACTION:** You discovered a traitor within your faction and had to deal with them", 1000, 5000],
        ["**FACTION:** You were tasked with infiltrating a rival faction's stronghold and planting explosives", 1500, 8000],
        ["**FACTION:** You were tasked with smuggling weapons and supplies across enemy lines", 500, 3000],
        ["**FACTION:** You successfully negotiated a treaty with a rival faction, leading to peace and prosperity for both sides", 500, 5000],
        ["**FACTION:** You were caught stealing from your own faction and had to face the consequences (:red_circle: 25% less income on your next 5 faction related jobs)", -500, -2000],
        ["**FACTION:** You were tasked with destroying a rival faction's weapon manufacturing facility", 1500, 8000],
        ["**FACTION:** You were assigned to lead a reconnaissance mission behind enemy lines", 1000, 5000],
        ["**FACTION:** You successfully captured a high-value target for your faction", 2000, 10000],
        ["**FACTION:** You were accused of cowardice in battle and had to prove your bravery", -500, -2000],
        ["**FACTION:** You were tasked with sabotaging a rival faction's supply chain", 1000, 5000],
        ["**FACTION:** You were sent on a mission to retrieve valuable intelligence for your faction", 500, 3000],
        ["**FACTION:** You were tasked with guarding a critical location for your faction", 500, 2000],
        ["**FACTION:** You successfully staged a diversionary attack on a rival faction's base", 1500, 8000],
        ["**FACTION:** You were tasked with eliminating a rival faction's sniper team", 1000, 5000],
        ["**FACTION:** You successfully negotiated the release of prisoners of war for your faction", 500, 3000],
        ["**FACTION:** You were tasked with training a local militia to fight alongside your faction", 500, 3000],
        ["**FACTION:** You were accused of fraternizing with a member of a rival faction and had to prove your loyalty", -500, -2000],
        ["**FACTION:** You were tasked with assassinating a high-ranking member of a rival faction", 2000, 10000],
        ["**FACTION:** You successfully stole a rival faction's vehicle and brought it back to your own faction's base", 1000, 5000],
        ["**FACTION:** You were assigned to lead a nighttime raid on a rival faction's outpost", 1500, 8000],
        ["**FACTION:** You were tasked with infiltrating a rival faction's intelligence network and gathering valuable information", 1000, 5000],
        ["**FACTION:** You were assigned to defend a critical location from a rival faction's attack", 500, 3000],
        ["**FACTION:** You successfully intercepted a rival faction's supply convoy and captured valuable resources", 1000, 5000],
        ["**FACTION:** You were tasked with hunting down and eliminating a rogue member of your own faction", 1500, 8000],
        ["**FACTION:** You stole from a rival faction", 500, 20000],
        ["**FACTION:** You successfully persuaded a rival faction to form an alliance with your own faction", 2000, 10000],
        ["**FACTION:** You were tasked with creating propaganda to influence the opinions of the local population in favor of your faction", 500, 3000],
        ["**FACTION:** You were assigned to rescue a group of hostages held by a rival faction", 1500, 8000],
        ["**FACTION:** You were accused of insubordination and had to prove your loyalty to your faction (:red_circle: 25% less income on your next 5 faction related jobs)", -500, -2000],
        ["**FACTION:** You were tasked with sabotaging a rival faction's communication network", 1000, 5000]
    ];
const
    profileModel = require("../../models/profileSchema"),
    cooldown = new Set(),
    cooldownTime = 60 * 1000;

module.exports = {

    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work and earn money"),

    async execute(interaction) {

        // loop through the cooldown set
        for (const id of cooldown) {
            // split the id into an array
            const split = id.split(" ::: ");

            // check if the user id is the same as the user who ran the command
            if (split[0] === interaction.user.id) {
                // check if the current time is greater than the cooldown time
                if (Date.now() < split[1] + cooldownTime) {

                    // display time like this <t:epochtime:R>

                    split[1] = parseInt(split[1]);


                    const
                        timeLeft = (split[1] + cooldownTime - Date.now()),
                        embed = new EmbedBuilder()
                            .setTitle("Cooldown")
                            .setDescription(`You are on cooldown until <t:${(Date.now() + timeLeft)}:R>`)
                            .setTimestamp()
                            .setFooter({
                                text: `Requested by ${interaction.user.tag}`,
                                iconURL: interaction.user.displayAvatarURL()
                            });

                    console.log(
                        [
                            split[1],
                            cooldownTime,
                            Date.now(),
                            Date.now() + cooldownTime,
                            timeLeft,

                        ]
                    )

                    return interaction.reply({embeds: [embed]});
                }
            }
        }

        // add dictionary of the user id and the current time
        const
            epochTime = Math.round(new Date().getTime() / 1000),
            endTime = `${interaction.user.id} ::: ${epochTime}`,
            expireTime = epochTime + 600;

        cooldown.add(endTime);

        setTimeout(() => {
            cooldown.delete(endTime);
            console.log(`Removed ${interaction.user.id} from the cooldown`);
        }, cooldownTime);

        const
            job_index = Math.floor(Math.random() * work_options.length),
            job = work_options[job_index],
            income = Math.floor(Math.random() * (job[2] - job[1] + 1)) + job[1],
            loss = income < 0;



        const
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(`You worked a normal, civilian job.`)
                .setDescription(`${job[0]} and ${loss ? "lost " : "earned"} $${income}!`)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL()
                });

        if (job[0].includes("FACTION")) embed.setTitle(`You worked for a faction.`);

        await profileModel.findOneAndUpdate(
            { userID: interaction.user.id, },
            { $inc: {currency: income} }
        )

        await interaction.reply({embeds: [embed]})

        // If income greater than 50k
        if (income > 50000) {

            // Pin the bots reply
            await interaction.channel.messages.fetch({ limit: 1 }).then(messages => {
                const lastMessage = messages.first();
                lastMessage.pin();
            });

            // add party emoji to the message
            await interaction.channel.messages.fetch({ limit: 1 }).then(messages => {
                const lastMessage = messages.first();
                lastMessage.react('🎉');
                lastMessage.react('🎊');
                lastMessage.react('🤓');
            })
        }
    }
}