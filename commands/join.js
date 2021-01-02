
exports.run = async (client, msg, args) => {
    // Check if author is connected to a VC
    if (!msg.member.voice.channel) 
        return msg.channel.send('Please connect to a voice channel first.');

    // Join the author's channel
    let conn = await msg.member.voice.channel.join();
}