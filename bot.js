const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const commands = require('./commands.json');

client.on('ready', () => {
  console.log("Online");
});

var prefix = /^!VOTE /
client.on('message', message => {
  if(message.content.match(prefix) && message.author != client.user){
    var content = message.content.replace(prefix,"");
    console.log(content);
    var valid = false;
    for(var i = 0; i < commands.length; i++){
      var command = commands[i];
      if(content == command.trigger){
        valid = true;
        args = content.split(" ");
        args.shift();
        call(command, message, args);
      }
    }
    if(!valid){
      send("Invalid command!\nSay "+String(prefix).replace("/", "").replace("^", "").replace("/", "")+" help for help.", message);
    }
  }
});

function call(command, message, args){
  eval(command.function);
}

function send(message, msgData){
  msgData.channel.send(message);
}

function help(msgData){
  var out = "";
  for(var i = 0; i < commands.length; i++){
    var command = commands[i];
    out+="-"+command.trigger+" "+command.args+"\n";
    out+="\t"+command.description+"\n";
  }
  send(out, msgData);
}

client.login(settings.token);
