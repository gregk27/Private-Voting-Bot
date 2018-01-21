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
        send("pong", message);
        break;
      case "help":
        help(message);
        break;
      default:
        send("Unknown Command. Say !VOTE help for help", message)

    }
  }
});

function send(message, msgData){
  msgData.channel.send(message);
}

function help(msgData){
  send("ping:\n\treturns pong", msgData)
}

client.login(settings.token);
