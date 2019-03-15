const Discord = require('discord.js');
const config = require("../token.json");
//const test = require("./libs/test.json")
const client = new Discord.Client({
   autoReconnect: true
});
const fs = require("fs");
const mysql = require("mysql");
const RainbowSixApi = require('rainbowsix-api-node');
const R6 = new RainbowSixApi();
const date = new Date();
client.commands = new Discord.Collection();
let isReady = true;
var Dictionary = require("oxford-dictionary");

let upt = 0;
setInterval(function () {
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
   password: "",
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
let sc = 0; // count of every 13 episodes
let u1, u2, curu; // users for mapveto

client.on('ready', () => {
   console.log(`${client.user.tag} is online on ` + client.guilds.size + ` server(s)!`);
   //client.user.setActivity('Oye! Daaru pe Daaru ji');
   client.user.setActivity(`Saas bhi kabhi Bahu thi Season - ${season}  Episode - ${watching}`, {
      type: 'WATCHING'
   })
   setInterval(function() {
      client.user.setActivity(`Saas bhi kabhi Bahu thi Season - ${season}  Episode - ${watching}`, {
         type: 'WATCHING'
      });
      watching++;
      sc++;
      if (sc === 13) {
         season++;
         watching = 1;
      }
   }, 30 * 60 * 1000);
   //.then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'Daaru is love, Daaru is life!'}`))
   //console.log(test.array[2])
});

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
   }
   if (newUserChannel !== undefined) {
      channel.send("**" + newMember.displayName + "** Joined : " + newUserChannel.name)
      //console.log(newMember.displayName + " Joined : " + newUserChannel.name)
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

      console.log(tempU);

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
      if (!rUser) return msg.channel.send("Please mention someone to know there rank!");
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

      if (!rows[2]) {
         return;
      } else {

         let xp = rows[0].xp;
         let xp2 = rows[1].xp;
         let xp3 = rows[2].xp;
         let id = rows[0].id;
         let id2 = rows[1].id;
         let id3 = rows[2].id;

         if (args.length >>> "0") return;

         /*if(msg.content.toLowerCase() === 'leaderboard') {
           //msg.reply('the person with most xp is <@' + id + '> , then <@' + id2 + '> and <@' + id3 + '>')
           msg.channel.send({embed: {
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

         }*/
         if (msg.content.toLowerCase() === "vella") {
            msg.channel.send({
               embed: {
                  color: 3447003,
                  fields: [{
                     name: "Ye hai vella!",
                     value: "<@" + id + "> with **" + xp + "** xp."
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

let arr = ["bank", "border", "consulate", "coastline", "villa", "club house", "oregon"];
client.on('message', message => {

   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);
   let channel = message.guild.channels.find(c => c.name == "map-veto");
   if (message.channel === channel) {
      if (message.content.toLowerCase().startsWith('setleader')) {

         function getUserFromMention(mention) {
            if (!mention) return;

            if (mention.startsWith('<@') && mention.endsWith('>')) {
               mention = mention.slice(2, -1);

               if (mention.startsWith('!')) {
                  mention = mention.slice(1);
               }

               return message.guild.members.get(mention);
            }
         }


         let lead1 = getUserFromMention(args[0]);
         let lead2 = getUserFromMention(args[1]);
         let myRole = message.guild.roles.find(f => f.name == "Team Leader");

         u1 = lead1;
         u2 = lead2;

         curu = lead1;

         if (!lead1 && !lead2) return message.channel.send('"setleader @user1 @user2"');
         if (lead1 === lead2) return //message.channel.send('both leaders cant be the same');
         if (!lead2) return //message.channel.send('mention a second team leader too!');

         lead1.addRole(myRole);
         lead2.addRole(myRole);

         let toss = [`${u1.displayName}`, `${u2.displayName}`];
         let uToss = Math.floor((Math.random() * toss.length));
         const result = toss[uToss];

         //   message.channel.send({embed: {
         //     color: 3447003,
         //     author: {
         //       name: "MAP-VETO",
         //       icon_url: client.user.avatarURL
         //     },
         //     description: "List of Maps to choose from...",
         //     fields: [{
         //         name: ".",
         //         value: "**BANK**"
         //       },
         //       {
         //         name: ".",
         //         value: "**BORDER**"
         //       },
         //       {
         //         name: ".",
         //         value: "**CLUB HOUSE**"
         //       },
         //       {
         //         name: ".",
         //         value: "**COASTLINE**"
         //       },
         //       {
         //         name: ".",
         //         value: "**CONSULATE**"
         //       },
         //       {
         //         name: ".",
         //         value: "**OREGON**"
         //       },
         //       {
         //         name: ".",
         //         value: "**VILLA**"
         //       }
         //     ],
         //     footer: {
         //       icon_url: client.user.avatarURL,
         //       text: `The Ramlals Tournament`
         //     }
         //   }
         // });

         message.channel.send({
            embed: {
               color: 3447003,
               author: {
                  name: "MAP-VETO",
               },
               description: "List of Maps to choose from... \n **BORDER**, **BANK**, **CLUB HOUSE**, **CONSULATE**,**COASTLINE**, **OREGON**, **VILLA**",
               footer: {
                  icon_url: client.user.avatarURL,
                  text: `The Ramlals Tournament`
               }
            }
         });
         message.channel.send(`Please start voting! ${curu.displayName}, How about you go first?`)

      }

      function reset() {
         let aRole = message.guild.roles.get('475934116865376267');
         aRole.members.map(mem => mem.removeRole(aRole));

         con.query(`delete from mapveto;`, (err, rows) => {
            if (err) throw err;
         });
         con.query(`insert into mapveto values("bank"),("border"),("consulate"),("coastline"),("oregon"),("club house"),("villa");`, (err, rows) => {
            if (err) throw err;
         });

         let newArr = ["bank", "border", "consulate", "coastline", "villa", "club house", "oregon"];
         arr = newArr;
      }

      if (message.content.toLowerCase().startsWith('reset')) {
         reset();
      }
      if (message.content.toLowerCase().startsWith('vote')) {

         if (message.author != curu.user) {
            message.channel.send(`Please let ${curu.displayName} vote!`);
            console.log(curu.displayName + message.author.username);
         } else {

            let messageArray = message.content.split(" ");
            let cmd = messageArray[0].toLowerCase();
            let args = messageArray.slice(1);
            let map = args.slice(0).join(" ");

            if (curu.user === u1.user) curu = u2;
            else curu = u1;

            if (map.toLowerCase() === "club house" || map.toLowerCase() === "clubhouse") map = "club house";

            con.query(`delete from mapveto where map = '${map}'`, (err, rows) => {
               if (err) throw err;

               //  const allEqual = arr => arr.every(v => v === arr[0]);
               let flag = 0;

               let check1 = arr.every((val, i, array) => val === array[0]);
               for (let i = 0; i < arr.length - 1; i++) {
                  if (arr[i] != arr[i + 1]) flag++;
               }


               if ((flag - 1) > 2 && map.length > 1) {
                  for (let i = 0; i < arr.length; i++) {
                     if (i == 0) message.channel.send("The remaining maps are: \n -------------------------");
                     if (arr[i] == `${map}`) {
                        arr[i] = "";
                     }
                  }
               }
               let tempArr = [];
               for (var i = 0; i < arr.length; i++) {
                  tempArr[i] = arr[i].toUpperCase();
               }
               message.channel.send(tempArr);
               message.channel.send("-------------------------");
               message.channel.send(`Please vote ${curu.user.username}!`);

               con.query(`select * from mapveto;`, (err, rows) => {
                  if (!rows[1]) {
                     let votem = rows[0].map;
                     const chosenmap = new Discord.RichEmbed()
                        .setColor(3447003)
                        .setTitle(`**${votem.toUpperCase()}**`)
                        .setDescription("is the map to be played, Good luck!")
                     message.channel.send(chosenmap);
                     //message.channel.send(`map that has been selected is ${votem}`);
                     reset();
                  }
               });

            });
         }
      }
   }
});

client.login(config.token);
