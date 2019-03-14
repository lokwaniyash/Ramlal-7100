const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports.run = async (client, msg, args, con) => {


	if (talkedRecently.has(msg.author.id)) {
				msg.channel.send("Wait **30** seconds before challenging someone. - " + msg.author);
	} else {

			 // the user can type the command ... your command code goes here :)
			 function generatePoints() {
		 	  return Math.floor(Math.random() * (150 - 30 +1)) + 30;
		 	}

		   let rPoints = generatePoints();

		 	let winner = ["0","1"]
		 	let winRandom = Math.floor((Math.random() * winner.length));
		 	let fUserID = msg.author;
		 	let fUser = `<@${fUserID.id}>`
		 	let oUser;
		 	if(msg.mentions.members.first()){
		 		oUser = msg.mentions.members.first();
		 	} else {
		 		msg.channel.send("Usage :`challenge <@user>`");
		 		return;
		 	}


		   if(msg.author.id == oUser.id){
		       msg.channel.send(
		         {embed: {
		           color: 3447003,
		           description: `You can't challenge yourself!`
		         }})
		         return;
		   }

		 	if(msg.mentions.members.last() != oUser) return msg.channel.send("Usage :`challenge <@user>`");

		 	let winUser;
		 	let lUser;

		 	if(winRandom == "0"){
		 		winUser = fUserID;
		 		lUser = oUser;
		 		msg.channel.send(
		 			{embed: {
		       	color: 3447003,
		 				description: `${fUser} has challenged ${oUser} to a battle!`
		 			}}).then( ms => {
		 			setTimeout( function() {
		 			ms.edit(
		 				{embed: {
		 	      	color: 3447003,
		 					description: `The fight has started!`
		 				}}).then( ms1 => {
		 				setTimeout( function() {
		 				ms1.edit(
		 					{embed: {
		 		      	color: 3447003,
		 						description: `They are fighting like crazy...`
		 					}}).then( ms2 => {
		 					setTimeout( function() {
		 					ms2.edit(
		 						{embed: {
		 			      	color: 3447003,
		 							description: `**OMFG** these savages won't stop!`
		 						}}).then( ms3 => {
		 						setTimeout( function() {
		 							ms3.edit(
		 								{embed: {
		 					      	color: 3447003,
		 									description: `**${winUser} is the chosen one!**`
		 								}})
		 						}, 2000)
		 					});
		 					}, 1000)
		 				});
		 				}, 1000)
		 			});
		 			}, 1000)
		 		});
		 	} else {
		 		winUser = oUser;
		 		lUser = fUserID;
		 		msg.channel.send(
		 			{embed: {
		       	color: 3447003,
		 				description: `${fUser} has challenged ${oUser} to a battle!`
		 			}}).then( ms => {
		 			setTimeout( function() {
		 			ms.edit(
		 				{embed: {
		 	      	color: 3447003,
		 					description: `The fight has started!`
		 				}}).then( ms1 => {
		 				setTimeout( function() {
		 				ms1.edit(
		 					{embed: {
		 		      	color: 3447003,
		 						description: `They are fighting like crazy...`
		 					}}).then( ms2 => {
		 					setTimeout( function() {
		 					ms2.edit(
		 						{embed: {
		 			      	color: 3447003,
		 							description: `**OMFG** these savages won't stop!`
		 						}}).then( ms3 => {
		 						setTimeout( function() {
		 							ms3.edit(
		 								{embed: {
		 					      	color: 3447003,
		 									description: `**${winUser} is the chosen one!**`
		 								}})
		 						}, 2000)
		 					});
		 					}, 1000)
		 				});
		 				}, 1000)
		 			});
		 			}, 1000)
		 		});
		 	}
		 //	console.log(winUser.id)
		 	con.query(`select * from xp where id = ${winUser.id} `, (err,rows) => {

		 		let pQuery;

		 		if(!rows[0]){
		 			pQuery = `insert into xp values ('${winUser.id}',${0},${rPoints})`
		 		} else if(rows[0].points == null){
		 			pQuery = `update xp set points = ${rPoints} where id = ${winUser.id}`
		 		} else {
		 			let points = rows[0].points;
		 			pQuery = `update xp set points = points + ${rPoints} where id = ${winUser.id}`
		 		}
		 		con.query(pQuery)

		 	});

		 	con.query(`select * from xp where id = ${lUser.id} `, (err,rows) => {

		 		let mQuery;

		 		if(!rows[0]){
		 			mQuery = `insert into xp values ('${lUser.id}',0,0)`
		 		} else if(rows[0].points == null){
		 			mQuery = `update xp set points = 0 where id = ${lUser.id}`
		 		} else if(rows[0].points <= rPoints){
		 			let points = rows[0].points;
		 			mQuery = `update xp set points = points - points where id = ${lUser.id}`
		 		} else {
		 			let points = rows[0].points;
		 			mQuery = `update xp set points = points - ${rPoints} where id = ${lUser.id}`
		 		}
		 		con.query(mQuery)

		 	});

		// Adds the user to the set so that they can't talk for a minute
		talkedRecently.add(msg.author.id);
		setTimeout(() => {
			// Removes the user from the set after a minute
			talkedRecently.delete(msg.author.id);
		}, 30000);
	}

}

module.exports.help = {
name: "challenge"
}
