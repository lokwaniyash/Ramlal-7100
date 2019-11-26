const Discord = require('discord.js');
const config = require("../token.json");
//const test = require("./libs/test.json")
const client = new Discord.Client({
  autoReconnect: true
});
const fs = require("fs");
const mysql = require("mysql");
const date = new Date();
client.commands = new Discord.Collection();
let isReady = true;
var Dictionary = require("oxford-dictionary");

let upt = 0;
setInterval(function() {
  upt++;
}, 1000);

var dconfig = {
  app_id: "1cab4a54",
  app_key: "15b3217322111decf6529ce3ac1d74c8",
  source_lang: "en"
};

var dict = new Dictionary(dconfig);

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bot"
});

con.connect(err => {
  if (err) throw err;
  console.log('connected to sql!');
});

function generateXp() {
  return Math.floor(Math.random() * (30 - 10 + 1)) + 10;
}

// Global Variables
let watching = 1; // episode count
let season = 1; // season count
let u1, u2, curu; // users for mapveto
let sec, minute, hour // time variables

client.on('ready', () => {
  console.log(`${client.user.tag} is online on ` + client.guilds.size + ` server(s)!`);
  //client.user.setActivity('Oye! Daaru pe Daaru ji');
  client.user.setActivity(`Saas bhi kabhi Bahu thi Season - ${season}  Episode - ${watching}`, {
    type: 'WATCHING'
  })
  // setInterval(function() {
  //    sec = upt;
  //    minute = Math.floor(sec / 60);
  //    sec -= minute * 60;
  //    hour = Math.floor(minute / 60);
  //    minute -= hour * 60;
  //    client.user.setActivity(`Saas bhi kabhi Bahu thi Season - ${season}  Episode - ${watching}`, {
  //       type: 'WATCHING'
  //    });
  // }, 1000);
  setInterval(function() {
    watching++;
    if (watching == 13) {
      season++;
      watching = 1;
    }
    client.user.setActivity(`Saas bhi kabhi Bahu thi Season - ${season}  Episode - ${watching}`, {
      type: 'WATCHING'
    })
  }, 30 * 60 * 1000);
  //.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'Daaru is love, Daaru is life!'}`))
  //console.log(test.array[2])
});

function hook(channel, title, message, color, avatar) { // This function uses quite a few options. The last 2 are optional.

  // Reassign default parameters - If any are blank.
  if (!channel) return console.log('Channel not specified.');
  if (!title) return console.log('Title not specified.');
  if (!message) return console.log('Message not specified.');
  if (!color) color = 'd9a744'; // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
  if (!avatar) avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png' // This is also an optional variable, you can change the default to any icon.

  // We want to remove spaces from color & url, since they might have it on the sides.
  color = color.replace(/\s/g, '');
  avatar = avatar.replace(/\s/g, '');

  // This is the start of creating the webhook
  channel.fetchWebhooks() // This gets the webhooks in the channel
    .then(webhook => {

      // Fetches the webhook we will use for each hook
      let foundHook = webhook.find('name', 'Webhook'); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

      // This runs if the webhook is not found.
      if (!foundHook) {
        channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png') // Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
          .then(webhook => {
            // Finally send the webhook
            webhook.send('', {
                "username": title,
                "avatarURL": avatar,
                "embeds": [{
                  "color": parseInt(`0x${color}`),
                  "description": message
                }]
              })
              .catch(error => { // We also want to make sure if an error is found, to report it in chat.
                console.log(error);
                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
              })
          })
      } else { // That webhook was only for if it couldn't find the original webhook
        foundHook.send('', { // This means you can just copy and paste the webhook & catch part.
            "username": title,
            "avatarURL": avatar,
            "embeds": [{
              "color": parseInt(`0x${color}`),
              "description": message
            }]
          })
          .catch(error => { // We also want to make sure if an error is found, to report it in chat.
            console.log(error);
            return channel.send('**Something went wrong when sending the webhook. Please check console.**');
          })
      }

    })

}

client.on('voiceStateUpdate', (oldMember, newMember) => {
  // if( newMember.mute || oldMember.mute || newMember.selfMute ||
  // oldMember.selfMute || newMember.selfDeaf || oldMember.selfDeaf ||
  // newMember.serverDeaf || oldMember.serverDeaf || newMember.serverMute ||
  // oldMember.serverMute) return;

  let channel = newMember.guild.channels.find(c => c.name == "vc-logs");

  if (!channel) return;

  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  if (oldUserChannel !== undefined) {
    channel.send("**" + oldMember.displayName + "** Left : " + oldUserChannel.name)
    //  console.log(oldMember.displayName + " Left : " + oldUserChannel.name)
  } else if (newUserChannel !== undefined) {
    channel.send("**" + newMember.displayName + "** Joined : " + newUserChannel.name)
    //console.log(newMember.displayName + " Joined : " + newUserChannel.name)
  }

  // auto vc here

  var Extra = 0;

  let arr = ['429677255178977280', '429677385693134849', '429677812203520020', '448147765265039381', '429677890473426965', '429678043770912779', '429678144266436628']
  let r6 = arr[0];
  let pubg = arr[1];
  let gta = arr[2];
  let fn = arr[3];
  let wr = arr[4];
  let rl = arr[5];
  let fr = arr[6];
  // R6
  // if (newMember.voiceChannel) {
  //   console.log("joined");
  //   if (newMember.voiceChannel.parentID == r6) {
  //     if (newMember.voiceChannel.members.array().length == 1) {
  //       Extra = 0;
  //       client.guilds.get('387214864650600461').channels.forEach(channel => {
  //         if (channel.parentID == r6) {
  //           if (channel.members.array().length == 0) {
  //             if (Extra == 1) {
  //               channel.delete();
  //             } else {
  //               Extra = 1;
  //             }
  //           }
  //         }
  //       });
  //       if (Extra == 0) newMember.guild.createChannel('🎮 Game Channel', 'voice')
  //         .then(
  //           ch => ch.setParent(r6)
  //         );
  //     }
  //   }
  // }
  //
  // if (oldMember.voiceChannel) {
  //   console.log("left");
  //   if (oldMember.voiceChannel.parentID == r6) {
  //     if (oldMember.voiceChannel.members.array().length == 0) {
  //       Extra = 0;
  //       client.guilds.get('387214864650600461').channels.forEach(channel => {
  //         if (channel.parentID == r6) {
  //           if (channel.members.array().length == 0) {
  //             if (Extra == 1) {
  //               if (channel) {
  //                 channel.delete();
  //               }
  //             } else {
  //               Extra = 1;
  //             }
  //           }
  //         }
  //       });
  //       if (Extra == 0) oldMember.guild.channels.createChannel('🎮 Game Channel', 'voice')
  //         .then(
  //           ch => ch.setParent(r6)
  //         );
  //     }
  //   }
  // }

  // PUBG
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == pubg) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == pubg) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        })  ;
        if (Extra == 0) newMember.guild.createChannel('PUBG', 'voice')
          .then(
            ch => ch.setParent(pubg)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == pubg) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == pubg) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('PUBG', 'voice')
          .then(
            ch => ch.setParent(pubg)
          );
      }
    }
  }
//
//   // GTA
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == gta) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == gta) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) newMember.guild.createChannel('GTA V', 'voice')
          .then(
            ch => ch.setParent(gta)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == gta) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == gta) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('GTA V', 'voice')
          .then(
            ch => ch.setParent(gta)
          );
      }
    }
  }

  // Fortnite
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == fn) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == fn) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) newMember.guild.createChannel('Fortnite', 'voice')
          .then(
            ch => ch.setParent(fn)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == fn) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == fn) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('Fortnite', 'voice')
          .then(
            ch => ch.setParent(fn)
          );
      }
    }
  }

  // Warrock
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == wr) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == wr) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) newMember.guild.createChannel('Warrock', 'voice')
          .then(
            ch => ch.setParent(wr)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == wr) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == wr) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('Warrock', 'voice')
          .then(
            ch => ch.setParent(wr)
          );
      }
    }
  }

  // Rocket league
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == rl) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == rl) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) newMember.guild.createChannel('Rocket League', 'voice')
          .then(
            ch => ch.setParent(rl)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == rl) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == rl) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('Rocket League', 'voice')
          .then(
            ch => ch.setParent(rl)
          );
      }
    }
  }

  // Forest
  if (newMember.voiceChannel) {
    console.log("joined");
    if (newMember.voiceChannel.parentID == fr) {
      if (newMember.voiceChannel.members.array().length == 1) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == fr) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                channel.delete();
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) newMember.guild.createChannel('Forest', 'voice')
          .then(
            ch => ch.setParent(fr)
          );
      }
    }
  }

  if (oldMember.voiceChannel) {
    console.log("left");
    if (oldMember.voiceChannel.parentID == fr) {
      if (oldMember.voiceChannel.members.array().length == 0) {
        Extra = 0;
        client.guilds.get('387214864650600461').channels.forEach(channel => {
          if (channel.parentID == fr) {
            if (channel.members.array().length == 0) {
              if (Extra == 1) {
                if (channel) {
                  channel.delete();
                }
              } else {
                Extra = 1;
              }
            }
          }
        });
        if (Extra == 0) oldMember.guild.channels.createChannel('Forest', 'voice')
          .then(
            ch => ch.setParent(fr)
          );
      }
    }
  }

});

/*client.on('message' , msg => {
  var timer = 30000;

  var countdown = setInterval(function (){
    timer -= 1;
    if (timer < 0){
        clearInterval(countdown);
        console.log("Timer is done!")
    }else{
        console.log(timer)
    }
  }, 1000);
});*/

client.on('message', msg => {

  let tempU = msg.author.tag;

  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  if (msg.member.hasPermission("ADMINISTRATOR")) return;

  con.query(`select * from xp where id = '${tempU}'`, (err, rows) => {
    if (err) throw err;

    let sql;

    if (rows.length < 1) {
      sql = `insert into xp (id,xp) values ('${tempU}','${generateXp()}')`
    } else {
      let xp = rows[0].xp;
      sql = `update xp set xp = ${xp + generateXp()} where id = '${tempU}'`;
    }

    con.query(sql);
  });

});

client.on('message', msg => {

  let cont = msg.content;


  var currentdate = new Date();
  let m;
  let h;
  if (currentdate.getHours() >= 12) {
    h = ((currentdate.getHours()) - 12)
    m = "PM";
  } else {
    h = currentdate.getHours()
    m = "AM";
  }

  var datetime = currentdate.getDate() + "/" +
    (currentdate.getMonth() + 1) + "/" +
    currentdate.getFullYear() + " @ " +
    h + ":" +
    currentdate.getMinutes() + ":" +
    currentdate.getSeconds() + " " +
    m;

  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd);
  if (commandfile) commandfile.run(client, msg, args, con, config, upt);

  if (msg.content.toLowerCase().startsWith("what rank is ") || msg.content.toLowerCase().startsWith("what is the rank of ")) {
    let rUser = msg.mentions.members.first();
    if (!rUser) msg.channel.send("Please mention someone to know there rank!");
    return;
    let ranks = [`Diamond`, `Bronze`, `Silver`, `Copper`, `Platinum`, `Nobody bothered giving ${rUser.displayName} a rank!`];
    let rRand = Math.floor((Math.random() * ranks.length));
    let rRank = ranks[rRand];
    msg.channel.send({
      embed: {
        color: 3447003,
        fields: [{
          name: `According to me(**And I'm always right!**)`,
          value: `**${rRank}**`
        }]
      }
    });
  }
  if (msg.content.startsWith("(╯°□°）╯︵ ┻━┻")) {
    msg.channel.send("┬─┬ ノ( ゜-゜ノ)  Calm down!  ")
  }
  if (msg.content.toLowerCase().startsWith("what time is it") || msg.content.toLowerCase().startsWith("what is the time") || msg.content.toLowerCase().startsWith("what time") || msg.content.toLowerCase().startsWith("what date") || msg.content.toLowerCase().startsWith("what date is it") || msg.content.toLowerCase().startsWith("what is the date")) {
    msg.channel.send({
      embed: {
        color: 3447003,
        description: `It is **${datetime}** as of now in **India**!`
      }
    });
  }
});

client.on('message', message => {

  if (message.author.bot) return;

  let replies = ["Hey there!", "What's poppin?", "Heyo!", "Sup!", "Hi there!", "Hiya!"];
  let result = Math.floor((Math.random() * replies.length));

  var args = message.content.split(/[ ]+/);

  if (message.channel.type === "text") {
    let cmd = message.content ? args[0].toLowerCase() : undefined;
    switch (cmd) {
      case "hi":
      case "hello":
      case "hey":
      case "kemcho":
        message.channel.send(replies[result]);
        return
        //case "tournament":
        //case "tourney":
        //    message.channel.send('https://gaming.youtube.com/c/TheRamlals/live');
        //return
        //case "brackets":
        //    message.channel.send('https://challonge.com/ramlalstournament');
        //return
      default:
        let user = message.mentions.users.first() ? message.mentions.users.first().id : args[1];
        //console.log(user)
        return
    }
  }
});

client.on('message', msg => {

  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);

  con.query(`select xp , id from xp order by xp desc;`, (err, rows) => {

    if (!rows[0]) {
      return;
    } else {

      let xp = rows[0].xp;
      let id = rows[0].id;

      if (args.length > 0) return;
      if (msg.content.toLowerCase().startsWith("vella")) {
        msg.channel.send({
          embed: {
            color: 3447003,
            fields: [{
              name: "Ye hai vella!",
              value: "**" + id + "** with **" + xp + "** xp."
            }]
          }
        });

      }
    }
  });

});

client.on('message', msg => {
  let myRole = msg.guild.roles.find(r => r.name == "The Ramlals");
  if (!myRole) {
    return;
  }
  if (msg.isMentioned(myRole)) {
    msg.channel.send('Need help? you can DM <@251735592113668097> or <@224792039743684608> or <@245994161252204544> .')
  }
});

client.on('message', msg => {
  let help = msg.mentions.users.first();

  if (!help) {
    return;
  }
  if (help == '<@472986297783549952>') {
    msg.channel.send('Hukum sirji!');
  }
});

client.on('message', msg => {
  let status = msg.mentions.users.first();
  if (!status) {
    return;
  }
  if (status == '<@412281789290381328>') {
    if (status.presence.status == 'offline') {
      msg.channel.send('Hey, Ramlal_ki_Biwi is not available currently!')
    }
  }

});



// client.on('message', msg => {
//
//       if(msg.content === "search"){
//         console.log("huh")
//         var lookup = dict.definitions("awesome").then(function(res) {
//           console.log(res.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]);
//         },
//         function(err) {
//           console.log(err);
//         });
//       }
// });

// let arr = ["bank", "border", "consulate", "coastline", "villa", "club house", "oregon"];
// client.on('message', message => {
//
//    let messageArray = message.content.split(" ");
//    let cmd = messageArray[0];
//    let args = messageArray.slice(1);
//    let channel = message.guild.channels.find(c => c.name == "map-veto");
//    if (message.channel === channel) {
//       if (message.content.toLowerCase().startsWith('setleader')) {
//
//          function getUserFromMention(mention) {
//             if (!mention) return;
//
//             if (mention.startsWith('<@') && mention.endsWith('>')) {
//                mention = mention.slice(2, -1);
//
//                if (mention.startsWith('!')) {
//                   mention = mention.slice(1);
//                }
//
//                return message.guild.members.get(mention);
//             }
//          }
//
//
//          let lead1 = getUserFromMention(args[0]);
//          let lead2 = getUserFromMention(args[1]);
//          let myRole = message.guild.roles.find(f => f.name == "Team Leader");
//
//          u1 = lead1;
//          u2 = lead2;
//
//          curu = lead1;
//
//          if (!lead1 && !lead2) return message.channel.send('"setleader @user1 @user2"');
//          if (lead1 === lead2) return //message.channel.send('both leaders cant be the same');
//          if (!lead2) return //message.channel.send('mention a second team leader too!');
//
//          lead1.addRole(myRole);
//          lead2.addRole(myRole);
//
//          let toss = [`${u1.displayName}`, `${u2.displayName}`];
//          let uToss = Math.floor((Math.random() * toss.length));
//          const result = toss[uToss];
//
//          //   message.channel.send({embed: {
//          //     color: 3447003,
//          //     author: {
//          //       name: "MAP-VETO",
//          //       icon_url: client.user.avatarURL
//          //     },
//          //     description: "List of Maps to choose from...",
//          //     fields: [{
//          //         name: ".",
//          //         value: "**BANK**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**BORDER**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**CLUB HOUSE**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**COASTLINE**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**CONSULATE**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**OREGON**"
//          //       },
//          //       {
//          //         name: ".",
//          //         value: "**VILLA**"
//          //       }
//          //     ],
//          //     footer: {
//          //       icon_url: client.user.avatarURL,
//          //       text: `The Ramlals Tournament`
//          //     }
//          //   }
//          // });
//
//          message.channel.send({
//             embed: {
//                color: 3447003,
//                author: {
//                   name: "MAP-VETO",
//                },
//                description: "List of Maps to choose from... \n **BORDER**, **BANK**, **CLUB HOUSE**, **CONSULATE**,**COASTLINE**, **OREGON**, **VILLA**",
//                footer: {
//                   icon_url: client.user.avatarURL,
//                   text: `The Ramlals Tournament`
//                }
//             }
//          });
//          message.channel.send(`Please start voting! <@${curu.id}>, How about you go first?`)
//
//       }
//
//       function reset() {
//          let aRole = message.guild.roles.get('475934116865376267');
//          aRole.members.map(mem => mem.removeRole(aRole));
//
//          con.query(`delete from mapveto;`, (err, rows) => {
//             if (err) throw err;
//          });
//          con.query(`insert into mapveto values("bank"),("border"),("consulate"),("coastline"),("oregon"),("club house"),("villa");`, (err, rows) => {
//             if (err) throw err;
//          });
//
//          let newArr = ["bank", "border", "consulate", "coastline", "villa", "club house", "oregon"];
//          arr = newArr;
//       }
//
//       if (message.content.toLowerCase().startsWith('reset')) {
//          reset();
//       }
//       if (message.content.toLowerCase().startsWith('vote')) {
//
//          if (message.author != curu.user) {
//             message.channel.send(`Please let <@${curu.id}> vote!`);
//             console.log(curu.displayName + message.author.username);
//          } else {
//
//             let messageArray = message.content.split(" ");
//             let cmd = messageArray[0].toLowerCase();
//             let args = messageArray.slice(1);
//             let map = args.slice(0).join(" ");
//
//             if (curu.user === u1.user) curu = u2;
//             else curu = u1;
//
//             if (map.toLowerCase() === "club house" || map.toLowerCase() === "clubhouse") map = "club house";
//
//             con.query(`delete from mapveto where map = '${map}'`, (err, rows) => {
//                if (err) throw err;
//
//                //  const allEqual = arr => arr.every(v => v === arr[0]);
//                let flag = 0;
//
//                let check1 = arr.every((val, i, array) => val === array[0]);
//                for (let i = 0; i < arr.length - 1; i++) {
//                   if (arr[i] != arr[i + 1]) flag++;
//                }
//
//
//                if ((flag - 1) > 2 && map.length > 1) {
//                   for (let i = 0; i < arr.length; i++) {
//                      if (i == 0) message.channel.send("The remaining maps are: \n -------------------------");
//                      if (arr[i] == `${map}`) {
//                         arr[i] = "";
//                      }
//                   }
//                }
//                let tempArr = [];
//                for (var i = 0; i < arr.length; i++) {
//                   tempArr[i] = arr[i].toUpperCase();
//                }
//                message.channel.send(tempArr);
//                message.channel.send("-------------------------");
//                message.channel.send(`Please vote <@${curu.id}>!`);
//
//                con.query(`select * from mapveto;`, (err, rows) => {
//                   if (!rows[1]) {
//                      let votem = rows[0].map;
//                      const chosenmap = new Discord.RichEmbed()
//                         .setColor(3447003)
//                         .setTitle(`**${votem.toUpperCase()}**`)
//                         .setDescription("is the map to be played, Good luck!")
//                      message.channel.send(chosenmap);
//                      //message.channel.send(`map that has been selected is ${votem}`);
//                      reset();
//                   }
//                });
//
//             });
//          }
//       }
//    }
// });

client.login(config.token);
