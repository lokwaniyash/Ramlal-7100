const Discord = require("discord.js");

module.exports.run = async (client, message, args, con, config, upt) => {
   let sec = upt;
   let minute = Math.floor(sec / 60);
   sec -= minute * 60;
   let hour = Math.floor(minute / 60);
   minute -= hour * 60;
   if (hour === 0) {
      message.channel.send(`I have has been awake for **${minute} Minutes & ${sec} Seconds!**`)
   } else if (hour === 0 && minute === 0) {
      message.channel.send(`I have has been awake for **${sec} Seconds!**`)
   } else {
      message.channel.send(`I have been awake for **${hour} Hours ${minute} Minutes & ${sec} Seconds!**`)
   }
}

module.exports.help = {
   name: "uptime"
}
