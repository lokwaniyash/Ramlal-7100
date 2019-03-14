const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

   if (!args[0]) return message.channel.send("Usage: leaderboard (spin, xp)")

   let command = args[0].toLowerCase()

   if (command == 'spin') {
      con.query(`select * from spinner order by spintime desc`, (err, rows) => {

         if (!rows[2]) {
            return;
         } else {
            let spintime1 = rows[0].spintime;
            let spintime2 = rows[1].spintime;
            let spintime3 = rows[2].spintime;

            let aTime1 = Math.floor(spintime1 / 60);
            let bTime1 = Math.floor(spintime1 - (aTime1 * 60));
            let aTime2 = Math.floor(spintime2 / 60);
            let bTime2 = Math.floor(spintime2 - (aTime2 * 60));
            let aTime3 = Math.floor(spintime3 / 60);
            let bTime3 = Math.floor(spintime3 - (aTime3 * 60));

            let spinid1 = rows[0].id;
            let spinid2 = rows[1].id;
            let spinid3 = rows[2].id;

            console.log(message.guild.members.get(spinid1));

            message.channel.send("Hmm... where did i keep the paper with the scores.")
               .then(ms => {
                  setTimeout(function() {
                     ms.edit("Oh, Here it is!").then(ms1 => {
                        setTimeout(function() {
                           ms1.edit({
                              embed: {
                                 color: 3447003,
                                 author: {
                                    name: "Leaderboards",
                                    icon_url: client.user.avatarURL
                                 },
                                 description: "Based on the SpinTime Database.",
                                 fields: [{
                                       name: ":trophy: 1",
                                       value: `@` + spinid1 + ` with maximum spin time of **${aTime1}** minutes and **${bTime1}** seconds.`
                                    },
                                    {
                                       name: ":trophy: 2",
                                       value: `@` + spinid2 + ` with maximum spin time of **${aTime2}** minutes and **${bTime2}** seconds.`
                                    },
                                    {
                                       name: ":trophy: 3",
                                       value: `@` + spinid3 + ` with maximum spin time of **${aTime3}** minutes and **${bTime3}** seconds.`
                                    }
                                 ],
                                 footer: {
                                    icon_url: client.user.avatarURL,
                                    text: "© TheRamlals"
                                 }
                              }
                           });
                        }, 750)
                     })
                  }, 750)
               })

         }
      })
   } else if (command == 'xp') {
      con.query(`select xp , id from xp order by xp desc`, (err, rows) => {

         if (!rows[2]) {
            return;
         } else {

            let xp = rows[0].xp;
            let xp2 = rows[1].xp;
            let xp3 = rows[2].xp;
            let id = rows[0].id;
            let id2 = rows[1].id;
            let id3 = rows[2].id;

            message.channel.send({
               embed: {
                  color: 3447003,
                  author: {
                     name: "Leaderboards",
                     icon_url: client.user.avatarURL
                  },
                  description: "Based on the XP Database.",
                  fields: [{
                        name: ":trophy: 1",
                        value: "@" + id + " with **" + xp + "** xp."
                     },
                     {
                        name: ":trophy: 2",
                        value: "@" + id2 + " with **" + xp2 + "** xp."
                     },
                     {
                        name: ":trophy: 3",
                        value: "@" + id3 + " with **" + xp3 + "** xp."
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
