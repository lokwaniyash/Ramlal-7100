const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports.run = async (client, message, args, con) => {
	if (talkedRecently.has(message.author.id)) {
				message.channel.send("Wait **5** minutes before spinning the <:spinner:481347451194834945> " + message.author);
	} else {

	let fTime = Math.floor(Math.random() * (350 - 30 +1)) + 30;
	let aTime = Math.floor(fTime / 60);
	let bTime = Math.floor(fTime - (aTime * 60));
	message.channel.send(`**${message.member.displayName}** has just spun the Fidget Spinner, Let's see how long it spins for!`).then( ms => {

		setTimeout( function() {
		if(aTime == "0"){
			ms.edit({embed: {
      	color: 3447003,
				fields: [{
            name: `**${message.member.displayName}** just spun the <:spinner:481347451194834945> for :`,
            value:`**${bTime}** seconds`
          }]
			}});
		} else if(aTime != "0"){
			ms.edit({embed: {
				color: 3447003,
				fields: [{
						name: `**${message.member.displayName}** just spun the <:spinner:481347451194834945> for :`,
						value:`**${aTime}** minutes and **${bTime}** seconds`
					}]
			}});
		}
		}, 4000)
	});

	con.query(`select * from spinner where id = ${message.author.id} `, (err,rows) => {

		let fQuery;

		if(!rows[0]){
			fQuery = `insert into spinner values(${message.author.id},${fTime})`
		} else if(rows[0].spintime < fTime){
			fQuery = `update spinner set spintime = ${fTime} where id = ${message.author.id}`
		} else {
			fQuery = `update spinner set spintime = spintime where id = ${message.author.id}`
		}

		con.query(fQuery)

	});
	talkedRecently.add(message.author.id);
	setTimeout(() => {
		// Removes the user from the set after a minute
		talkedRecently.delete(message.author.id);
	}, 300000);
}

}

module.exports.help = {
name: "fidgetspin"
}
