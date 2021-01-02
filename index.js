/* First commit: 12/30/2020
    Index file sets up the bot connection and has the command manager
    Updated: 1/2/2021
*/

//  Install dotenv with npm. Lets you use .env files to hide info
require('dotenv').config();

//  Run "npm install discord.js node-opus @discordjs/opus ffmpeg-static"
const Discord = require('discord.js');
const client = new Discord.Client(); // uses the discord.js package to setup client

// Constant variables
const prefix = '!'; // prefix to denote a command
const ownerID = 'yourID';

/*  LISTENER EVENTS */

client.on('message', msg => {

    // Don't do anything if the bot sent the message or if the prefix isn't included
    if (msg.author.bot || !msg.content.startsWith(prefix)) {
        return; 
    } 
  
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    try {
        let cmdFile = require(`./commands/${cmd}.js`); // Requires a JS file in the commands folder
        cmdFile.run(client, msg, args); // Passes 3 variables into the file
    } catch (ex) {
        console.log(ex.stack);
    } 
  });


/*
// This is triggered whenever a message is sent in a channel the bot has access to
client.on('message', msg => {

    // Ignores messages from bots and messages without the prefix
    //if (msg.author.bot) return;
    if (msg.content.indexOf(prefix.length) !== 0) return;

    // Lets split the command from the prefix, and split the command arguments into an array
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();
    if (command === 'ping') {
        message.reply('Pong!');
      }

     COMMAND HANDLER 
    try {
        let cmdFile = require(`./commands/${cmd}.js`); // Requires a file in the commands folder
        cmdFile.run(client, msg, args); // Passes 3 variables into the file
    } catch (ex) {
        console.log(ex.stack);
    } 
}); */

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.login();