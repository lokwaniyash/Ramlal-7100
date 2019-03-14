const Discord = require("discord.js");

module.exports.run = async (client, message, args, con) => {
	/*await message.react('☑');
	await message.react('❌');

	setTimeout(function () {
  //console.log(message.reactions.find(reaction => reaction.emoji.name === '☑').count);
	message.channel.send('☑' + message.reactions.find(reaction => reaction.emoji.name === '☑').count);
	message.channel.send('❌' + message.reactions.find(reaction => reaction.emoji.name === '❌').count);
}, 10000)*/
	//let array = Array.from(message.guild.members)
	//let result = Math.floor((Math.random() * array.length));
  con.query(`select * from mapveto`, (err,rows) => {
  let array = []
  for(let i =0;i<=rows.length-1;i++){

      array.push(rows[i].map)

  }
  console.log(array)
  });
}

module.exports.help = {
name: "test123"
}
