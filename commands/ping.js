const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {

  msg.channel.send("Ping?").then( ms => {
    let apil = ms.createdTimestamp - msg.createdTimestamp;
    let l = client.ping;
    let iconurl = null;
    if (apil >= "1350"){
      iconurl = "https://cdn.discordapp.com/attachments/470116069655314432/477880025723568148/1.png";
    } else if (apil <= "1349" && apil>="800"){
      iconurl = "https://cdn.discordapp.com/attachments/470116069655314432/477880009940533278/2.png"
    } else if (apil <="799" && apil >= "400") {
      iconurl = "https://cdn.discordapp.com/attachments/470116069655314432/477880021587853313/3.png"
    } else if (apil <= "399") {
      iconurl = "https://cdn.discordapp.com/attachments/470116069655314432/477874068582957056/4.png"
    }
    ms.edit({embed: {
        color: 3447003,
        author: {
          name: "Pong?",
          icon_url: client.user.avatarURL
        },
        "thumbnail": {
          "url": iconurl
        },
        fields: [{
            name: "**Latency**",
            value: apil + "ms"
          },
          {
            name: "**API Latency**",
            value: Math.round(l) + "ms"
          }
        ]
      }
    });
  });
}

module.exports.help = {
  name: "ping"
}
