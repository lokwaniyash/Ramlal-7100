const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  let coin = ["Tails!", "Heads!"]
  let result = Math.floor((Math.random() * coin.length));
  if(args.length >>> "0") return;
  message.channel.send({embed: {
    color: 3447003,
    description: `It's **${coin[result]}**`
  }})
}

module.exports.help = {
name: "toss"
}
