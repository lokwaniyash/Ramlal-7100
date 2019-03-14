const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

  if(!args[0]) return message.channel.send("Usage: leaderboard (spin, xp)")

  let command = args[0].toLowerCase()

  if(command == 'spin'){
    con.query(`select * from spinner order by spintime desc`, (err,rows) => {

      if(!rows[2]){
        return;
      } else {
        let spintime1 = rows[0].spintime;
        let spintime2 = rows[1].spintime;
        let spintime3 = rows[2].spintime;

        let spinid1 = rows[0].id;
        let spinid2 = rows[1].id;
        let spinid3 = rows[2].id;

        message.channel.send("Hmm... where did i keep the paper with the scores.")
        .then(ms =>{
          setTimeout( function() {
            ms.edit("Oh, Here it is!").then(ms1 =>{
              setTimeout( function() {
              ms1.edit({embed: {
                  color: 3447003,
                  author: {
                    name: "Leaderboards",
                    icon_url: client.user.avatarURL
                  },
                  description: "Based on the SpinTime Database.",
                  fields: [{
                      name: ":trophy: 1",
                      value: `<@${spinid1}> with maximum spin time of **${spintime1}** seconds.`
                    },
                    {
                      name: ":trophy: 2",
                      value: `<@${spinid2}> with maximum spin time of **${spintime2}** seconds.`
                    },
                    {
                      name: ":trophy: 3",
                      value: `<@${spinid3}> with maximum spin time of **${spintime3}** seconds.`
                    }
                  ],
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© TheRamlals"
                  }
                }
              });
            }, 1000)
            })
          }, 2000)
        })

      }
    })
  } else if(command == 'xp'){
    con.query(`select xp , id from xp order by xp desc`, (err,rows) => {

      if (!rows[2]) {
        return;
      } else {

        let xp = rows[0].xp;
        let xp2 = rows[1].xp;
        let xp3 = rows[2].xp;
        let id = rows[0].id;
        let id2 = rows[1].id;
        let id3 = rows[2].id;

        message.channel.send({embed: {
            color: 3447003,
            author: {
              name: "Leaderboards",
              icon_url: client.user.avatarURL
            },
            description: "Based on the XP Database.",
            fields: [{
                name: ":trophy: 1",
                value: "<@" + id + "> with **" + xp + "** xp."
              },
              {
                name: ":trophy: 2",
                value: "<@" + id2 + "> with **" + xp2 + "** xp."
              },
              {
                name: ":trophy: 3",
                value: "<@" + id3 + "> with **" + xp3 + "** xp."
              }
            ],
            footer: {
              icon_url: client.user.avatarURL,
              text: "© TheRamlals"
            }
          }
        });
      }
    });
  } else {
    message.channel.send("Usage: leaderboard (spin, xp)")
    return
  }
}

module.exports.help = {
name: "leaderboard"
}
