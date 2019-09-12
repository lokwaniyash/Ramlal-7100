const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
   const embed = new Discord.RichEmbed()
      .setTitle("These are all the magical things I can do!")
      .setColor("#aae2ff")
      .setFooter("TheRamlals", client.user.avatarURL)
      .addField("(╯°□°）╯︵ ┻━┻", "Tells you to calm the F down!")
      .addField("challenge @user", "You can get points if you win, they're worthless but atleast you won.")
      .addField("fidgetspin", "Spins a fidget spinner and the one with the highest time goes to the leaderboard.")
      .addField("leaderboard xp/spin", "\"xp\" for XP Leaderboard and \"spin\" for Spinner Leaderboard.")
      .addField("ping", "Gives the bot's Ping!")
      .addField("points @user", "Gives the points of the mentioned User!")
      .addField("toss", "At random gives heads or tails!")
      .addField("uptime", "Tells how long I've been awake for!")
      .addField("what rank is @user / what is the rank of @user","Gives a random rank for the user, No offense")
      .addField("what time is it / what is the time / what time / what date / what date is it / what is the date","Gives the current time")
      .addField("Vella","Gives the person with the most xp")

      message.channel.send(embed);
}

module.exports.help = {
   name: "pleeease?"
}
