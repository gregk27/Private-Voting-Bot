const Discord = require("discord.js");

function Vote (ID, message, children) {
  this.ID = ID,
  this.message = message,
  //Message ids of children
  this.children = children
}

Vote.prototype = {
    constructor: Vote,

    submit:function (child){
      console.log(this.children);
      for(var i = 0; i < this.children.length; i++){
        if(this.children[i] == child){
            console.log("match");
            this.children.splice(i,1);
            console.log(this.children);
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
      this.message.channel.send("Vote Completed");
      console.log("Vote Completed");
    }

}

votes = []

module.exports = {
  newVote:function(ID, message, children){
    votes.push(new Vote(ID, message, children));
  },

  submit:function(ID, childID){
      for(var i = 0; i < votes.length; i++){
        if(votes[i].ID == ID){
          votes[i].submit(childID);
        }
      }
  }
}
