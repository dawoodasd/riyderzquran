
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "-" 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});
 
client.on('message', message => {
    var p = message.mentions.members.first();
    var reason = message.content.split(" ").slice(2).join(' ');
    var log = message.guild.channels.find('name', 'warns-log');
    if(message.content.startsWith(`${prefix}warn`)){
        if(!p) return message.reply(`**منشن الشخص اول**`);
        if(!reason) return message.reply(`**حط سبب**`);
        if(!p.bannable) return message.reply(`**مقدر اعطي وورن لشخص من الادارة**`);
        reason = reason.replace('1', "**كتابة الاوامر بالشات العام**");
        reason = reason.replace('2', "**بيع اشياء**");
        reason = reason.replace('3', "**التحذث عن السياسة**");
        reason = reason.replace('4', "**التحذث عن الدين **");
        reason = reason.replace('5', "**التحدث عن الطائفية**");
        reason = reason.replace('6', "**السبام**");
        reason = reason.replace('7', "**فتح تذكرة من دون سبب**");
        reason = reason.replace('8', "**العنصرية**");
        reason = reason.replace('9', "**عدم الاحترام**");
        reason = reason.replace('10', "**نشر بالعام**");
        var embed = new Discord.RichEmbed()
        .setAuthor(`تم التحذير`)
        .addField(`Name ♣`, `<@${p.id}>`)
        .addField(`By ♣`, `<@${message.author.id}>`)
        .addField(`Reason ♣`, reason)
        .setTimestamp()
        .setColor("WHITE")
        .setFooter(` `)
        message.channel.send(`${p} ${reason}`)
            message.delete();
        log.send({embed});
        warnRoles = ['Only Me']
    }
});


client.login("NTc5NTkyMTE3OTcwNjY1NDc1.XP5qoA.zAx0FrRgq4HRrU_cksQeHrvDKs0");