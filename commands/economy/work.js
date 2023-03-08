const {
        SlashCommandBuilder,
        EmbedBuilder
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
    ];
const profileModel = require("../../models/profileSchema");

const cooldown = new Set();
const cooldownTime = 600 * 1000;

module.exports = {

    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work and earn money"),

    async execute(interaction) {

        if (cooldown.has(interaction.user.id)) {
            return interaction.reply({
                content: `You are on cool down! Please wait ${cooldownTime / 1000} seconds`,
                ephemeral: true
            });
        }

        cooldown.add(interaction.user.id);
        setTimeout(() => {
            cooldown.delete(interaction.user.id);
        }, cooldownTime);

        const
            job_index = Math.floor(Math.random() * work_options.length),
            job = work_options[job_index],
            income = Math.floor(Math.random() * (job[2] - job[1] + 1)) + job[1],
            embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(job[0])
                .setDescription(`${job[0]} and earned $${income}!`)
                .setTimestamp()
                .setFooter({
                    text: `Requested by ${interaction.user.tag}`,
                    iconURL: interaction.user.displayAvatarURL()
                });

        await profileModel.findOneAndUpdate(
            {
                userID: interaction.user.id,
            },
            {
                $inc: {currency: income}
            }
        )

        await interaction.reply({embeds: [embed]})
    }
}