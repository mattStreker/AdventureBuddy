// Joins author's channel and plays music

const ytdl = require('ytdl-core-discord');
const streamOptions = { seek: 0, volume: 1 };

exports.run = async (client, msg, args) => {

    // Check if author is connected to a VC
    if (!msg.member.voice.channel) 
        return msg.channel.send('Please connect to a voice channel first.');
    
    // Check if there is an argument after the '!play' command
    if (!args[0])
        return msg.channel.send('Please input a url following the command.');

    let url = args[0];

    // Validate the url
    let validate = await ytdl.validateURL(url);
    if (!validate)
        return msg.channel.send('Please enter a valid URL.');

    // Get info about the video
    let info = await ytdl.getInfo(url);

    // Join the author's channel
    let conn = await msg.member.voice.channel.join();

    let dispatcher = play(conn, url);
    //let dispatcher = conn.play(await ytdl(url, {filter: 'opus' } ));

    msg.react('👍');
    msg.channel.send(`Now playing: ${info.videoDetails.title}`);
}

async function play(connection, url) {
  connection.play(await ytdl(url), { type: 'opus' });
} 