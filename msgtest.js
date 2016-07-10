const talk = require('./talk.js');
const readline = require('readline');

class Tty {
  constructor() {
    this.tty = readline.createInterface(process.stdin, process.stdout);
    this.tty.on('line', (msg) => {
      this.resolve(msg);
    });
    this.tty.on('close', () => {
      this.tty.close();
      process.stdin.destroy();
      this.reject();
    });
  }
  createReadLinePromise() {
    process.stdout.write('> ');
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const tty = new Tty();

exchange(new talk.State());

function exchange(state) {
  tty.createReadLinePromise()
  .then((msg) => {
    const newState = talk.updateState(state, msg);
    const replies = talk.getMessages(newState);
    replies.forEach((reply) => { console.log(reply); });
    exchange(newState);
  }).catch((err) => {
    console.log(err);
    console.log('exited');
  });
}
