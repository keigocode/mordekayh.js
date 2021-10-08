const {MordeKayh, Intents} = require('./index.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS]});

bot.on('ready', () => {
	console.log(`${bot.user.username}#${bot.user.discriminator}`);
})

console.log(bot.timems('10year'))

bot.login('ODc4NDgxODMyMjIyNTQ3OTk4.YSBz9g.cpOajVPCSK0SHOwjLm8VqwhOwkU');