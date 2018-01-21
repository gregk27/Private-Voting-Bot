const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
  console.log("Online");
});

var prefix = /^!VOTE /
client.on('message', message => {
  if(message.content.match(prefix) && message.author != client.user){
    var content = message.content.replace(prefix,"");
    console.log(content);
    switch (content) {
      case "ping":
        message.channel.send("pong");
        break;
      case "help":
        message.channel.send("ping:\n\treturns pong")
        break;
      default:
        message.channel.send("Unknown Command. Say !VOTE help for help")

    }
  }
});


client.login(settings.token);
