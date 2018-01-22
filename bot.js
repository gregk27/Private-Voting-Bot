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
      if(content.split(" ")[0] == command.trigger){
        valid = true;
        args = content.substring(content.split(" ")[0].length+1);
        console.log(args);
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

function start(msgData, args){
  var ID = msgData.author.tag.split("#")[1] + " " + args.split(" ")[0];
  var options = [];
  var split = args.split("\"");
  for(var i = 1; i < split.length; i++){
    if(split[i+1] == ","||split[i-1] == ","){
      options.push(split[i]);
    }
    else if(split[i] == ","){
      continue;
    }
    else{
      break;
    }
  }

  var mode = "FPTP";
  var target = 0;
  var privacy = false;
  if(args.includes("STV")){
    mode = "STV"
    var target= args[args.indexOf("STV")+4]+args[args.indexOf("STV")+5];
    target = target.replace(" ", "");
  }
  if(args.includes("-p")||args.includes("--private")){
    privacy = true;
  }



  console.log("NEW POLL");
  console.log("\t" + ID);
  console.log("\t" + options);
  console.log("\t" + mode);
  console.log("\t" + target);
  console.log("\t" + privacy);
  send(msgData.author+" Started a vote", msgData);
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
