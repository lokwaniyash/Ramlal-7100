const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {

  con.query(`select * from spinner order by spintime desc;`, (err,rows) => {

    if(!rows[2]){
      return;
    } else {
      let spintime1 = rows[0].spintime;
      let spintime2 = rows[1].spintime;
      let spintime3 = rows[2].spintime;

      let spinid1 = rows[0].id;
      let spinid2 = rows[1].id;
      let spinid3 = rows[2].id;

      if(args.length >>> "0") return;

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
}

module.exports.help = {
name: "blah blah test spinleaderboard"
}
