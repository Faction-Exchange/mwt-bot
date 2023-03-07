const
    {Client, Events, GatewayIntentBits, PermissionsBitField, EmbedBuilder, Collection} = require('discord.js'),
    fs = require('fs'),
    path = require('path'),
    log = require('../data/punishment_logs.json'),
    logChannel = 1078460956276961331;

class report {
    static log(message) {
        console.log("[" + new Date().toLocaleString() + "] " + message);
    }

    static error(message) {
        console.error("ERROR: [" + new Date().toLocaleString() + "] " + message);
    }
}

function embedToChannel(channel, embed) {
    channel.send({embeds: [embed]});
}

class PunishmentLog {

    static addPunishmentLog(punishment, user, reason, moderator, time) {

        time = time || null;

        const
            log = require('../data/punishment_logs.json'),
            date = new Date().toLocaleString(),
            logEntry = {
                punishment: punishment,
                user: user,
                moderator: moderator,
                reason: reason,
                date: date
            };

        let id = 0;

        switch (punishment) {
            case "kick":
                id = log.kicks.length;
                logEntry.id = id;
                log.kicks.push(logEntry);
                break;

            case "ban":
                id = log.bans.length;
                logEntry.id = id;
                log.bans.push(logEntry);
                break;

            case "mute":
                id = log.mutes.length;
                logEntry.id = id;
                log.mutes.push(logEntry);
                break;

            case "warn":
                id = log.warning.length;
                logEntry.id = id;
                log.warning.push(logEntry);
                break;

            default:
                report.error("Invalid punishment type: " + punishment);
                break;

        }

        fs.writeFileSync(path.join(__dirname, '../data/punishment_logs.json'), JSON.stringify(log, null, 2));

    }


    static getPunishmentLog(id) {
        const log = require('../data/punishment_logs.json');
        return log.find(logEntry => logEntry.id === id);
    }

    static getPunishmentLogs() {
        return require('../data/punishment_logs.json')
    };

}

class fileManager {

    static checkKeyExists(key, object) {

        if (object.hasOwnProperty(key)) {
            return true;
        } else {
            object[key] = "";
            return false;
        }

    }

}

// export all
module.exports = {
    Client, Events, GatewayIntentBits, Collection,
    report,
    fs, path,
    PunishmentLog
}