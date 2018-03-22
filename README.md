# Private-Voting-Bot
A discord bot that allows users to vote privately

# Features
  - Polls that allow members of a group to anonymously vote
    - Unlimited options
    - Votes are completely secret
    - ~~Raw results are displayed when all users have voted~~
    - Tallied results are displayed when all users have voted
    -Multiple voting systems
      -Single vote
      -Multiple vote

# Instructions
  ### Starting a Poll
  Enter command `!vote start @group [opt1,opt2,opt3,...] mode`
  This will send a private message to all members of the mentioned group

  ### Voting in a poll
  To vote in a poll, enter the command hinted in the poll message, replacing <opt> with the option number you want
  
# Setup
  To add the bot to your server, follow the instructions [here](https://discordapp.com/oauth2/authorize?client_id=404741828315709440&scope=bot&permissions=482368).

# Future
  - Allow users to change their vote
  - Ranked voting systems
  - Better syntax error messages
  - [~~Each user can have multiple polls running~~](https://github.com/Aree-Vanier/Private-Voting-Bot/commit/cf34b89fd1472ce36bea354fea9ef5316f1fd3f0)
  - [~~Users can stop polls manually~~](https://github.com/Aree-Vanier/Private-Voting-Bot/commit/94deca9017a9a0d331cb9e44e4d8e9945aa7081a)
  - [~~Poll results are tallied~~](https://github.com/Aree-Vanier/Private-Voting-Bot/commit/aaf8e2fb1c28a18e70ddf792375e4129e149cb72)
  - [~~Shorter poll ids~~](https://github.com/Aree-Vanier/Private-Voting-Bot/commit/cf34b89fd1472ce36bea354fea9ef5316f1fd3f0)
  - [~~Sort results by votes~~](https://github.com/Aree-Vanier/Private-Voting-Bot/commit/5070b0b3a0f249cab4cb8cca083c0258f6f0dfcf)
  - ~~Ability to mention multiple users without needing a group~~ (Cancelled)
  - ~~Polls that close after an amount of time~~ (Cancelled)

# settings.json
  In order to protect my disord token, I have it hidden in a gitignored settings.json file. In order to run the bot, create a file called `settings.json` that contains`{"token":"YOUR_TOKEN"}` in the root folder.
