const Discord = require("discord.js");

module.exports.run = (client, message, args, con) => {
  let pUser;
  if(message.mentions.members.first()) {
    pUser = message.mentions.members.first().user;
  } else {
    pUser = message.author;
  }
  con.query(`select points from xp where id = '${pUser.tag}'`,(err,rows) => {
    if(!rows[0]){
      message.channel.send(
        {embed: {
          color: 3447003,
          description: `<@${pUser.id}> has **0** points, and needs to challenge somebody to gain points!`
        }});
    } else {
      message.channel.send({embed: {
        color: 3447003,
        description: `<@${pUser.id}> has **${rows[0].points}** points`
      }});
    }
  });
}

module.exports.help = {
name: "points"
}
