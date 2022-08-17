# BCT Discord Bot <img src="res/bot.png" width="35" height="35" alt="Bot Profile Pic">

This is a general purpose bot for BCT078 batch discord server.

### Features

- Logs user joins and leaves
- Logs deleted and edited messages
- Archive message to a specified channel when reacted with specific emote

### Commands

All commands are made to be slash commands. So, simply type / and you can see all the commands listed along with desciprition and guide on what parameters are needed. However, you can use some inline commands too. Change the bot prefix using `/prefix` command.

**_Configuration_**

- `/prefix`: Change bot prefix
- `/setwelcome`: Sets the welcome channel with a custom message
- `/setuserlog`: Sets a channel to log user joins and leaves
- `/setmessagelog`: Sets a channel to log messsage deletes and edits

**_Moderation_**

- `/ban` : Bans a user
- `/kick` : Kicks a user

**_Utilities_**

- `/flipacoin` : Flips coin
- `/echo` : Sends message to a specific channel
- `/forward` : Forwards a message to a specific channel using message link

**_Testing_**

- `/simulatejoin`: Simulates user join message
- `/simulateleave`: Simulates user leave message
