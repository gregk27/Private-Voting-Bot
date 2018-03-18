const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
const commands = require('./commands.json');
const votes = require("./votes.js");
const crypto = require("crypto");

console.log("test");

client.login(settings.token);

client.on('ready', () => {
  console.log("Online");
});

//The prefix the bot will look for
var prefix = /^!vote /
client.on('message', message => {
  if(message.content.match(prefix) && message.author != client.user){
    //Get the content (message without prefix)
    var content = message.content.replace(prefix,"");
    console.log(content);
    //Check to see if command exists
    var valid = false;
    for(var i = 0; i < commands.length; i++){
      var command = commands[i];
      //Get the first part of the message content
      if(content.split(" ")[0] == command.trigger){
        valid = true;
        //Get arguments from command
        args = content.substring(content.split(" ")[0].length+1);
        console.log(args);
        //Call the command's function
        call(command, message, args);
      }
    }
    //Send command does not exists message
    if(!valid){
      send("Invalid command!\nSay "+String(prefix).replace("/^", "").replace("/", "")+" help for help.", message);
    }
  }
});

var lastMessage;

//Start a new poll
function start(msgData, args){
  console.log(args);

  //Get the options from the arguments
  opts = args.split("[")[1];
  opts = opts.split("]")[0];
  opts = opts.split(",");
  console.log(opts)

  //Get the Mode
  mode = args.split("]")[1];
  mode = mode.replace(" ","");
  console.log(mode);

  //Create options list
  options = "";
  for(var i = 0; i < opts.length; i++){
    options += i+":\t"+opts[i]+"\n";
  }

  //Generate an ID
  var ID = votes.newID();
  msgData.channel.send("Poll started with ID: "+ID)
  //Get the mentioned group
  mention = args.split(" ")[0];
  mention.replace("@","");
  //Get targets from group
  targets = msgData.guild.roles.find("name", mention).members.array();

  //Send private messages to targets
  var sent = [];
  for(var i = 0; i < targets.length; i ++){
    user = targets[i].user;
    if(!user.bot){
      user.send("You have been chosen to vote in poll "+ID+".\n"+options+"\nTo reply enter `!vote vote <opt#> "+ID+"`");
      sent.push(user.id);
      console.log(user.id);
      console.log(ID+"\t"+user.id.split("#")[1])
    }
  }
  console.log(sent.length + "\t" + sent);
  //Save poll data
  votes.newVote(ID, msgData, sent, opts, mode);
}

//Stop a running poll
function stop(msgData, args){
  votes.stop(msgData, args)
}

//Submit vote to poll
function submit(msgData, args){
  var user = msgData.author;

  //Get the id of the poll
  var ID = args.split(" ")[1];

  //Get selected option
  var option = args.split(" ")[0]

  //Submit vote
  votes.submit(ID,user.id, option);
  console.log(args+"\t"+user.id);
}

//Call function from command
function call(command, message, args){
  eval(command.function);
}

//Send a message to active channel
function send(message, msgData){
  var sentMessage = null;
  var data = msgData.channel.send(message).then(msg => sentMessage = msg);
  console.log("Message Sent");
  return sentMessage;
}

//Send command help
function help(msgData){
  var out = "";
  for(var i = 0; i < commands.length; i++){
    var command = commands[i];
    out+="-"+command.trigger+" "+command.args+"\n";
    out+="\t"+command.description+"\n";
  }
  send(out, msgData);
}
