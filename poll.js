const botconfig = require("./botconfig.json");//gives link to the prefix of the bot
const Discord = require("discord.js");//access Discord.js
const bot = new Discord.Client({disableEveryone: true});//Defines Bot

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online in ${bot.guilds.size} servers!`)
    bot.user.setActivity("Your Polls | `help", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.channel.send("You just DMed me! You must go back, and try this in the server. After all, you're the only one who can see the poll here.");
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    function get_random_color() {
        var color = "";
        for(var i = 0; i < 3; i++) {
            var sub = Math.floor(Math.random() * 256).toString(16);
            color += (sub.length == 1 ? "0" + sub : sub);
        }
        return "#" + color;
    }
    
    if(cmd === `${prefix}ping`) {       
        let m = await message.channel.send("_ _");
        let pingEmbed = new Discord.RichEmbed()
        .setDescription(":ping_pong: PIIIING! POOOONG!")
        .setColor(get_random_color())
        .addField("Latency:", `${m.createdTimestamp - message.createdTimestamp} milliseconds`)
        .addField("This may not be accurate, as larger commands will take longer to process and respond.", ":shrug:")
        .addField("(TEST) latency:", `${bot.ping} milliseconds.`)
        return message.channel.send(pingEmbed)
        
    }
    
    if(cmd === `${prefix}yesno`) {
        let surveyEmbed2 = new Discord.RichEmbed()
        .setDescription("A survey has been sent in!")
        .setColor(get_random_color())
        .addField("Yes/No Topics:", args.join(" "))
        
        
        message.channel.send(surveyEmbed2)
            .then(function (message) {
              message.react("✅")
              message.react("❎")
              message.react("🤷")
              if(message.member.hasPermission("MANAGE_MESSAGES") && args[0] === "Pin") {
                 message.pin() 
              }
            }).catch(function() {
              //Something
             });
        message.delete()
    }
    
    if(cmd === `${prefix}updown`) {
        let surveyEmbed = new Discord.RichEmbed()
        .setDescription(`A survey has been sent in by ${message.author}!`)
        .setColor(get_random_color())
        .addField("Thumbs Up/Thumbs down topics:", args.join(" "))
        
        
        message.channel.send(surveyEmbed)
            .then(function (message) {
              message.react("👍")
              message.react("👎")
              message.react("🤷")
              if(message.member.hasPermission("MANAGE_MESSAGES") && args[0] === "Pin") {
                 message.pin() 
              }
            }).catch(function() {
              //Something
             });
        message.delete()
    }
    
    /*if(cmd === `${prefix}poll`) {
        var arguments = String(args)
        if(arguments[0] === "Pin") { 
            for(i = 1; arguments[i].charAt(0) !== ":"; i++) {
                if(arguments[i].charAt(0) !== ":") {
                    var topic = arguments[Number(i) + 1]
                    let pollEmbed = new Discord.RichEmbed()
                    .setDescription(`${message.author} Sent in a poll! React your answer.`)
                    .setColor(get_random_color())
                    .addField("Topic(s)", topic)
                    
                    message.channel.send(pollEmbed)
                    .then(function (message) {
                         
                        for(i = 1; arguments[i].charAt(0) !== ":"; i++) {
                            message.react(arguments[i])
                        }
                        message.pin()
                    }).catch(function() {
                        //Something
                    });
                    
                }
            }
        } else {
            for(i = 0; String(arguments[i]).charAt(0) !== ":"; i++) {
                if(String(arguments[i]).charAt(0) !== ":") {
                    var topic = arguments[Number(i) + 1]
                    let pollEmbed = new Discord.RichEmbed()
                    .setDescription(`${message.author} Sent in a poll! React your answer.`)
                    .setColor(get_random_color())
                    .addField("Topic(s)", topic)
                    
                    message.channel.send(pollEmbed)
                    .then(function (message) {
                        for(i = 0; String(arguments[i]).charAt(0) !== ":"; i++) {
                            message.react(arguments[i])
                        }
                        
                    }).catch(function() {
                        //Something
                    });
                    
                }
            }
        }
        
        message.delete()
    }*/
    
    if(cmd === `${prefix}role-list`) {
        let roleEmbed = new Discord.RichEmbed()
        .setColor(get_random_color())
        .addField("A list of all the roles:", message.guild.roles.map(role => `<@&${role.id}>`).join("\n"))
        .addField("This may not be all of your roles!", "If so, make sure to put my bot role at the top of your role list. If it still doesn't work, contact Sapphire in his support server! :)")
        
        message.channel.send(roleEmbed)
    }
    
    if(cmd === `${prefix}help`) {
        if(!args[0]) {
            let helpEmbed = new Discord.RichEmbed()
            .setDescription("Command List")
            .setColor(get_random_color())
            .addField(`Command Usage ("<>" Required, "[]" Optional)`, "Description.")
            .addField(`${prefix}ping`, "Gives Latency of Bot")
            .addField(`${prefix}updown <Topic>`, "Creates a survey where you can vote thumbs up, thumbs down, or a shrug.")
            .addField(`${prefix}yesno <Topic>`, "Creates a survey where you can vote yes, no, or a shrug.")
            .addField(`${prefix}role-list`, `A list of all the roles in your server! If it doesn't respond, try to ping the bot by using ${prefix}ping If that works, then you have too many roles for the embed to handle.`)
            .addField(`${prefix}help [Command Name]`, "This command.")
            
            return message.channel.send(helpEmbed)
        } else {
            if(args[0] === `ping`) {
                message.channel.send("Gives Latency of Bot")
            } else if(args[0] === "updown") {
                message.channel.send(`Usage: ${prefix}updown <topic>. A Topic Should be given. This creates a survey where you can vote thumbs up, thumbs down, or a shrug.`)
            } else if(args[0] === `yesno`) {
                message.channel.send(`Usage: ${prefix}yesno <topic>. A Topic Should be given. This creates a survey where you can vote yes, no , or a shrug.`)
            } else if(args[0] === "role-list") {
                message.channel.send(`Usage: ${prefix}role-list. This gives all the roles in your server. If it doesn't respond, try to ping the bot by using ${prefix}ping. If that works, then you have too many roles for the embed to handle. :shrug: `)
            } else {
                message.channel.send(`Usage of Help Command: ${prefix}help [Command Name] A Command Name can be given, however it is not required. If you don't input a command name then it will give you a command list.`)
            }
        }
       
    }
    
});

//Do github thing
bot.login(process.env.token)