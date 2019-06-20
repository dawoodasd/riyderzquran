const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '+'

client.on('ready', () => {
    console.log(`~~~~~~~~~~~~~~~~~`);
    console.log(`Logging into Discord`);
    console.log(`~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`on  ${client.guilds.size} Servers `);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setGame(`#Riyderz Quran |+quran`,"http://twitch.tv/y04zgamer")
    client.user.setStatus("dnd")
 });

 
client.on('message', (message) => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + 'quran')) {
        let codes = message.content.split(' ').slice(1);
        let num;
        if(!codes[0] || isNaN(codes[0])) num = 1
        else num = parseInt(codes[0])
       
        // Embed Of Quran
        let embed = new Discord.RichEmbed()
        .setAuthor("Quran | القرآن", client.user.displayAvatarURL)
        .setTitle("صفحات القرآن الكريم")
        .setImage(getURLCodes(num))
        .setFooter(getFooterCodes(num))
        // Reactions
        let l = '⬅';
        let p = '⏹';
        let r = '➡';
        // Filters
        let lF = (reaction, user) => reaction.emoji.name == l && user.id == message.author.id;
        let pF = (reaction, user) => reaction.emoji.name == p && user.id == message.author.id;
        let rF = (reaction, user) => reaction.emoji.name == r && user.id == message.author.id;
        message.channel.send(embed).then(async msg => {
            await msg.react(r)
            await msg.react(p)
            await msg.react(l)
            // Collecters
            let lC = msg.createReactionCollector(lF)
            let pC = msg.createReactionCollector(pF)
            let rC = msg.createReactionCollector(rF)
            lC.on('collect', codes => {
                if(num == 604) return;
                num++;
                embed.setImage(getURLCodes(num))
                embed.setFooter(getFooterCodes(num))
                msg.reactions.forEach(reaction => {
                    reaction.fetchUsers().then(usersCodes => {
                        usersCodes.forEach(user => {
                            if(user.bot) return;
                            reaction.remove(user)
                        })
                    })
                })
                msg.edit(embed)
            })
            pC.on('collect', codes => {
                message.channel.send("سيتم اغلاق المصحف خلال 5 ثواني").then(codes => {
                    codes.delete(5000)
                    msg.delete(5000)
                    message.delete(5000)
                })
            })
            rC.on('collect', codes => {
                if(num == 1) return;
                num--;
                embed.setImage(getURLCodes(num))
                embed.setFooter(getFooterCodes(num))
                msg.reactions.forEach(reaction => {
                    reaction.fetchUsers().then(users => {
                        users.forEach(user => {
                            if(user.bot) return;
                            reaction.remove(user)
                        })
                    })
                })
                msg.edit(embed)
            })
        })
    }
})
function getURLCodes(num) {
    return `http://quran.ksu.edu.sa/ayat/safahat1/${num}.png`
}
function getFooterCodes(num) {
    return `الصفحة رقم ${num} من أصل 604 صفحة`
}


client.login(process.env.BOT_TOKEN);
