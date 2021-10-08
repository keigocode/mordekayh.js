const {Client, Intents} = require('discord.js');
const express = require('express');
const app = express();
const sha256 = require('crypto-js/sha256');
const path = require('path');

class MordeKayh extends Client {
	message(func){
		bot.on('message', (message) => func(message));
	}
	commandHandler(route){
		const {LocalStorage} = require('node-localstorage');
		const db = new LocalStorage(route);
		this.commands = db;
		this.routeCommands = route;
	}
	getCommand(name){
		if(!this.commands) return console.log(new Error('command folder not chosen'));

		let data = undefined;
		this.commands._keys.forEach((element, i, array) => {
			const type = require(`${this.routeCommands}/${element}`);
			if(Array.isArray(type.value)){
				data = type.value.find(ch => ch == name) ? type : undefined;
			}else {
				data = type.value == name ? type : undefined;
			}

		})
		return data;
	}
	listCommands(all){
		if(!this.commands) return console.log(new Error('Command folder not chosen'));

		this.commands._keys.map(ch => require(`${this.routeCommands}/${ch}`));
	}
	helpCommands(){
		if(!this.commands) return console.log(new Error('Command folder not chosen'));

		return this.commands._keys.map(ch => {
			const data_elige = require(`${this.routeCommands}/${ch}`);
			return {
				description: data_elige.description, 
				value: data_elige.value, 
				category: data_elige.category ? ch.category : null
			};
		})
	}
	database(route){
		const {LocalStorage} = require('node-localstorage');
		if(!route) return console.log(new Error('Add route for databases.'));

		if(route == this.routeCommands){
			console.log(new Error('NO USE THIS ROUTE FOR databaseManagerS.'))
		}else {
			const db = new LocalStorage(route);
			this.databaseManager = db;
			this.routedatabaseManager = route;
		}
	}
	setDB(name){
		if(!this.databaseManager) return console.log(new Error('First add route for databaseManagers'));
		if(!name) return console.log(new Error('Add name.'));

		let name_db = this.databaseManager.getItem(name);
		if(!name_db) {
			console.log(new Error('This databaseManager not found.'));
		}else {
			this.databaseManager.setItem(name, {
				databaseManager: {},
				created: new Date(),
				calls: 0
			})
		}
	}
	startDB(name){
		if(!this.databaseManager) return console.log(new Error('First add route for databaseManagers'));
		if(!name) return console.log(new Error('Add name.'));

		let name_db = this.databaseManager.getItem(name);
		if(!name_db) {
			this.databaseManager.setItem(name, JSON.stringify({
				databaseManager: {},
				created: new Date(),
				calls: 0
			}))
			return JSON.parse(this.databaseManager.getItem(name));
		}else {
			return JSON.parse(name_db);
		}
	}
	getDB(name){
		if(!this.databaseManager) return console.log(new Error('First add route for databaseManagers'));
		if(!name) return console.log(new Error('Add name.'));

		return this.databaseManager.getItem(name);
	}
	logger(data){
		if(!this.databaseManager) return console.log(new Error('This function uses the component of databaseManager, first add the folder for the databases.'));

		const allLogs = this.getDB('logs.logs');
		if(!allLogs){
			this.databaseManager.setItem('logs.logs', JSON.stringify([{
				data: data,
				date: new Date(),
				sha256: sha256(data + new Date()).toString()
			}]))
		}else {
			allLogs = this.startDB('logs.logs');
			allLogs.push({
				data: data,
				date: new Date(),
				sha256: sha256(data + new Date()).toString()
			})
		}
	}
	getLogs(date){
		let data = this.getDB('logs.logs');
		if(!data) return console.log(new Error('logs not found'));

		if(!date) return data;
		return data.filter((ch) => new Date(ch.date) - 1 >= new Date() - date);
	}
	encrypt(data){
		return sha256(data).toString();
	}
	server(options = {}){
		if(options.views){
			app.set('views', path.join(__dirname, options.views));
			app.set('view engine', 'ejs');
			app.engine('html', require('ejs').renderFile);
		}
		app.use(express.urlencoded({extended: true}));
		app.use(express.json());

		if(options.guilds){
			app.get('/guilds/:id', (req, res) => {
				let guilds = options.guilds ? options.guilds : [];
				let search_guild = guilds.find(ch => ch.id == req.params.id);
				if(!search_guild) return res.send({
					message: options.messageError ? options.messageError : "this guild has not been found.",
					data: null
				});

				res.send({
					message: options.messageResponse ? options.messageResponse : "Guild found.",
					data: search_guild
				})
			});
		}

		return app;
	}
	timems(str){
		this.configuration = this.configuration ? this.configuration : {};
		let segundos = 1000;
		let minutos = segundos * 60;
		let horas = minutos * 60;
		let dias = horas * 24;
		let semana = dias * 7;
		let meses = dias * 30;
		let años = dias * 365.25; 

		str = String(str);
	  if (str.length > 100) {
	    return console.log(new Error('is this number real?'));
	  }
	  var match = /^(-?(?:\d+)?\.?\d+) *(ms|s|m|h|d|mes|año)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  let cases = {
	  	year: this.configuration.lang == "es" ? "año" : "year",
	  	month: this.configuration.lang == "es" ? "mes" : "month",
	  	day: this.configuration.lang == "es" ? "dia" : "day"
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'year':
	      return n * años;
	    case 'month':
	      return n * meses;
	    case 'd':
	      return n * dias;
	    case 'h':
	      return n * horas;
	    case 'm':
	      return n * minutos;
	    case 's':
	      return n * segundos;
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  };
	}
	config(configuration){
		this.configuration = configuration;
	}
}

module.exports = {MordeKayh, Intents};