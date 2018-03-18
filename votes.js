const Discord = require("discord.js");

//Vote constructor
function Vote (ID, message, children, options, mode) {
  this.ID = ID;
  this.message = message;
  //Message ids of sent votes
  this.children = children;
  //Collected votes
  this.votes = [];
  this.options = options;
  this.mode = mode;
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
            if(this.mode=="S") this.votes.push(option);
            if(this.mode=="M"){
              console.log("Multivote")
              var options = option.replace("[","").replace("]","").split(",");
              console.log(options)
              for(var v = 0; v < options.length; v ++){
                this.votes.push(options[v]);
              }
            }
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

      //The amount of votes each option got
      var scores = [];

      console.log(this.options);

      //Iterate over the options
      for(var i = 0; i < this.options.length; i++){
        var temp = 0;
        console.log(this.options[i]);
        //Iterate over the submitted votes
        for(var v = 0; v < this.votes.length; v++){
          console.log(this.votes[v]);
          //If the option selected matches the current option's index, log it
          if(this.votes[v]==i){
            console.log("Counted");
            temp ++;
          }
        }
        console.log(temp);
        //Push the count to scores
        scores.push(temp);
      }

      console.log(scores);

      var order = [];

      //Order the results
      for(var i = 0; i < this.options.length; i++){
        //If there is nohing in the list, add something
        if(order.length == 0){
          order.push(i)
          continue;
        }

        //The amount of votes the current option got
        count = parseInt(scores[i]);

        var inserted = false;
        for(var a = 0; a < order.length; a++){
          //If the count is bigger than a point in the list, insert it and break
          if(count > parseInt(scores[order[a]])){
            order.splice(a,0,i);
            inserted = true;
            break;
          }
            //If the count is equal to a point in the list, insert it and break
          else if(count == parseInt(scores[order[a]])){
            order.splice(a,0,i);
            inserted = true;
            break;
          }
        }
        //If it wasnt inserted, the pop it on the end
        if(!inserted){
            order.splice(scores.length,0,i);
        }
      }

      console.log(order);

      //Create output string
      var results = "\n";
      for(var i = 0; i < order.length; i++){
        results+=this.options[order[i]]+": "+scores[order[i]]+"\n";
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
  newVote:function(ID, message, children, options, mode){
    votes.push(new Vote(ID, message, children, options, mode));
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
  },
  //Stop a running vote
  stop:function(msgData, ID){
    for(var i = 0; i < votes.length; i++){
      console.log(votes[i].ID + "\t" + ID);
      if(votes[i].ID == ID){
        votes[i].end();
        return;
      }
    }
    msgData.channel.send("Vote "+ID+" not found");
  }
}
