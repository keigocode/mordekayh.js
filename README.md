# MordeKayh

All the functions of discord.js but with some helpers and interactive commands.

## Install 

install mordekayh in your project
```
npm install mordekayh.js
```

## Usage 

```JavaScript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.on('ready', () => {
	console.log(`${bot.user.username}#${bot.user.discriminator}`);
})

bot.login('TOKEN');
```

### Commander

This repository is with the use of hand commands, you can use this by configuring as follows.

Example:

```JavaScript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.commandHandler('./commands');
```

In order to use the commands perfectly, use this template in each command.

```JavaScript
module.exports = {
	value: ['command'],
	description: "Template command",
	category: "helper",
	func: (bot, message, args) => {
		// YOUR CODE HERE
	}
}
```

here is a simple example of how to execute the commands with the message event

```Javascript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});
const prefix = "!";

bot.on('message', (message) => {
	const init = message.content.split(' ', 1)[0];
	init.replace(prefix, '');
	const command = bot.getCommand(init);
	if(!command) return message.channel.send('Command not found');

	command.func(bot, message, args)
})

bot.login('TOKEN');
```

## local databases

Initialize a database for your bot locally, or you can just use another database.
Usage database: 

```JavaScript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.database('./databases');
```

you can use the archive or you can use the database manager. These databases come with a template that you can easily change with the manager or directly with the functions.

Usage database

```JavaScript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.database('./databases');
const database = bot.startDB('init.database');
bot.setDB('init.database', []);

const data = bot.getDB('init.database');
```

### Use server for APIs

now you can create a fast and secure environment with the use of express and some plugins.

```javascript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.on('ready', () => {
	console.log(`${bot.user.username}#${bot.user.discriminator}`);
})
const app = bot.server({
	guilds: bot.startDB('guilds')
});

app.listen(1000, () => {
	console.log('Server on');
});

app.get('/', (req, res) => {
	res.send({message: "Simple API with express."})
})

bot.login('TOKEN');
```

### Logger 

record and exchange data with this logger. This logger is good on occasions when we want to know certain actions of the user, or we simply want to save everything as backup, This logger uses dates and sha256 codes, which you can distribute by message or action of your users.

```javascript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.on('ready', () => {
	// SAVING LOG
	bot.logger('Bot on');
})

bot.database('./databases');
```

#### getting the logs

You can get logs in various ways, manually or by default by our repository.

```javascript
const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.on('ready', () => {
	// obtaining the logs from 10 minutes ago to the current time.
	bot.getLogs(bot.timems('10m'))
})

bot.database('./databases')
```

Note: filter it with `.filter` or with` .sort`.

### Support

Get support in discord: https://discord.gg/4r3bTAWGSF

## Developers

* **KeigoCode** - *Developer* - [Github](https://github.com/KeigoCode)
* **Kan014** - *Manager*

## Information

This project is an extension to the open source bots in Discord.

MordeKayh bot is the start of great projects.


---
⌨️ with ❤️ by [KeigoCode](https://github.com/keigocode) 😊