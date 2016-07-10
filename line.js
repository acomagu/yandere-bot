'use strict';
const LineBot = require('@3846masa/linebot');

if(!process.env['LINE_CHANNEL_ID'] || !process.env['LINE_CHANNEL_SECRET'] || !process.env['LINE_MID']) {
  console.error('Set LINE_CHANNEL_ID, LINE_CHANNEL_SECRET and LINE_MID as environment variables.');
  process.exit(1);
}

const bot = new LineBot({
  channelID: process.env['LINE_CHANNEL_ID'],
  channelSecret: process.env['LINE_CHANNEL_SECRET'],
  MID: process.env['LINE_MID']
});

class User {
  constructor(user) {
    this.user = user;
  }
  sendText(text) {
    bot.postText({
      user: user,
      text: text
    });
  }
  sendMessages(messages) {
    messages.forEach((message) => {
      this.sendText(message);
    });
  }
}

module.exports = {
  listen: ((port) => {
    new Promise((resolve, reject) => {
      bot.on('message', (res) => {
        resolve(res);
      });
      bot.listen(port);
      console.log("Listening in " + port + " ...");
    }).catch((err) => { console.log(err); })
  ),
  User: User,
  LineBot: LineBot
};


