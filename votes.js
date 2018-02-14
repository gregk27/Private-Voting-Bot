const Discord = require("discord.js");

function Vote (ID, message, children, options) {
  this.ID = ID;
  this.message = message;
  //Message ids of children
  this.children = children;
  this.votes = [];
  this.options = options;
}

Vote.prototype = {
    constructor: Vote,

    submit:function (child, option){
      console.log(this.children);
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i] == child){
            console.log("match");
            this.children.splice(i,1);
            console.log(this.children);
            this.votes.push(option);
            break;
        }
      }
      console.log(this.children.length);
      if(this.children.length == 0){
        console.log("Ending");
        this.end();
      }
    },

    end:function(){

      var scores = [];

      console.log(this.options);

      for(var i = 0; i < this.options.length; i++){
        var temp = 0;
        console.log(this.options[i]);
        for(var v = 0; v < this.votes.length; v++){
          console.log(this.votes[v]);
          if(this.votes[v]==i){
            console.log("Counted");
            temp ++;
          }
        }
        console.log(temp);
        scores.push(temp);
      }

      console.log(scores);

      var results = "\n";
      for(var i = 0; i < this.options.length; i++){
        results+=this.options[i]+"("+i+"): "+scores[i]+"\n";
      }

      this.message.channel.send("Vote Completed."+results);
      console.log("Vote Completed");
      terminate(this.ID);
    }

}

votes = []

function terminate(ID){
      for(var i = 0; i < votes.length; i++){
        console.log(votes[i].ID + "\t" + ID);
        if(votes[i].ID == ID){
          votes.splice(i, 1);
        }
      }
}

module.exports = {
  newVote:function(ID, message, children, options){
    votes.push(new Vote(ID, message, children, options));
  },

  submit:function(ID, childID, option){
      for(var i = 0; i < votes.length; i++){
        console.log(votes[i].ID + "\t" + ID);
        if(votes[i].ID == ID){
          console.log("ID good");
          votes[i].submit(childID, option);
        }
      }
  },

  newID:function(){
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    while(true){
      var conflict = false;
      var ID = "";

      //Generate ID
      for (var i = 0; i < 4; i++){
        ID += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      //Check for conflicts
      for(var i = 0; i < votes.length; i++){
        if(votes[i].ID == ID){
          conflict = true;
        }
      }
      //If conflicts exist, generate a new code
      if(!conflict){
        break;
      }
    }

    return ID;
  }
}
