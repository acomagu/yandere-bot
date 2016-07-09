const talk = require('./talk.js');
const line = require('./line.js');

let states = {};

line.listen(3000).then((res) => {
  const content = res.content;
  if(content.contentType === LineBot.CONST.CONTENT_TYPE.TEXT) {
    const user = new line.User(bot, content.from);
    const state = states[content.from] || new talk.State();

    const newState = talk.updateState(state, content.text);

    const messages = talk.getMessages(newState)
    user.sendMessages(messages);

    states[content.from] = newState;
  }
});
