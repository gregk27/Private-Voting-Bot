const Discord = require("discord.js");

//Vote constructor
function Vote (ID, message, children, options) {
  this.ID = ID;
  this.message = message;
  //Message ids of sent votes
  this.children = children;
  //Collected votes
  this.votes = [];
  this.options = options;
}

Vote.prototype = {
    constructor: Vote,

    //Submit a vote
    submit:function (child, option){
      console.log(this.children);
      //Check for source message in sent messages
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i] == child){
            console.log("match");
            //Remove from children
            this.children.splice(i,1);
            console.log(this.children);
            //Record Vote
            this.votes.push(option);
            break;
        }
      }
      console.log(this.children.length);
      //End poll if everyone has voted
      if(this.children.length == 0){
        console.log("Ending");
        this.end();
      }
    },

    //End the vote, tally and display results
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

      //Create output string
      var results = "\n";
      for(var i = 0; i < this.options.length; i++){
        results+=this.options[i]+"("+i+"): "+scores[i]+"\n";
      }

      //Send vote completion message
      this.message.channel.send("Vote Completed."+results);
      console.log("Vote Completed");
      //terminate the vote
      terminate(this.ID);
    }

}

votes = []

//Remove a vote from the list of active votes
function terminate(ID){
      for(var i = 0; i < votes.length; i++){
        console.log(votes[i].ID + "\t" + ID);
        if(votes[i].ID == ID){
          votes.splice(i, 1);
        }
      }
}

module.exports = {
  //Create a new vote
  newVote:function(ID, message, children, options){
    votes.push(new Vote(ID, message, children, options));
  },

  //Submit a vote
  submit:function(ID, childID, option){
      //Submit to vote with matcing ID
      for(var i = 0; i < votes.length; i++){
        console.log(votes[i].ID + "\t" + ID);
        if(votes[i].ID == ID){
          console.log("ID good");
          votes[i].submit(childID, option);
        }
      }
  },

  //Generate a unique ID
  newID:function(){
    //Possible id characters
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
