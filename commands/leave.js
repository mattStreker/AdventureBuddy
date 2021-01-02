// The bot leaves the voice channel if it's connected to one

exports.run = (client, msg, args) => {
    msg.guild.me.voice.channel.leave();
}