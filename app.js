'use strict';
const talk = require('./talk.js');
const line = require('./line.js');



let states = {};

line.listen(process.env.PORT || 3000).then((res) => {
  console.log("Handle: " + res);
  const content = res.content;
  if(content.contentType === line.LineBot.CONST.CONTENT_TYPE.TEXT) {
    const user = new line.User(content.from);
    const state = states[content.from] || new talk.State();

    const newState = talk.updateState(state, content.text);

    const messages = talk.getMessages(newState)
    user.sendMessages(messages);

    states[content.from] = newState;
  }
}).catch((err) => { console.log(err); });


//rinna

// var Twit = require('twit');
// const RINNA_TWITTER_ID = '3274075003';
// var T = new Twit({
//   consumer_key: process.env.CONSUMER_KEY,
//   consumer_secret: process.env.CONSUMER_SECRET,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });
// 
// function sendDirectMessageToRinna(message){
//   T.post('direct_messages/new', { user_id: RINNA_TWITTER_ID, text: message }, function (err, data, response) {
//     if (err){
//       console.log(err);
//     }else{
//       console.log('message sent');
//     }
//   });
// }
// 
// var stream = T.stream('user');
// 
// stream.on('connect', function () {
//    console.log('\nuser stream connecting..')
// })
// stream.on('connected', function () {
//    console.log('user stream connected.')
// })
// 
// //ユーザーの各種イベントを監視
// // stream.on('user_event', function (data) {
// //    console.log(data.event);
// // })
// 
// //ユーザーのDMを監視
// stream.on('direct_message', function (data){
//   console.log(data.direct_message.sender_id);
//   console.log(data.direct_message.text);
// });
