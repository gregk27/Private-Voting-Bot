const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');

client.on('ready', () => {
  console.log("Online");
});

var prefix = "!VOTE "
client.on('message', message => {
  if(message.content.startsWith(prefix) $$ message.author != client.user){
    if(message.content === prefix+"ping"){
      message.channel.send("pong");
    }
    else if(message.content === prefix+"help"){
      message.channel.send("ping:\n\treturns pong")
    }
    else{
      message.channel.send("Unknown Command. Say !VOTE help for help")
    }
  }
});


client.login(settings.token);
