const Discord = require("discord.js");

module.exports.run = async (client, message, args, config) => {
		message.delete()
	 if(!message.member.hasPermission("ADMINISTRATOR")) return;
	    message.channel.send('Resetting...')
			.then(msg => msg.delete())
	    .then(ms => client.destroy())
	    .then(() => client.login(`NDcyOTg2Mjk3NzgzNTQ5OTUy.DlQQYw.ZpMio2Fr5-DGX9rBXn8LPzPDFJM`));
}

module.exports.help = {
name: "quickreset!!!"
}
