const discord = require('discord.js');
const config = require("./config.json");
const fs = require('fs');

const client = new discord.Client();
client.commands = new discord.Collection();
client.queue = new Map();
client.config = config;

client.on('message', function(message) {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  cmd.run(client, message, args);
});

fs.readdir("./cmd/", (err, files) => {if (err) return console.error(err);files.forEach(file => {if (!file.endsWith(".js")) return;let props = require(`./cmd/${file}`);let commandName = file.split(".")[0];console.log(`Load command ${commandName}`);client.commands.set(commandName, props);});});

client.login(config.token)
