const STAGE = {
  INITIAL: Symbol(),
  GREETING: Symbol(),
  NAME: Symbol(),
  FRIEND: Symbol(),
  FRIEND_REPLY: Symbol(),
  PRESS: Symbol(),
  ASTROLOGY: Symbol(),
  END: Symbol(),
  END_MARRIED: Symbol()
};

module.exports = {
  updateState: (lastState, text) => {
    if(text == '/reset') {
      return new State();
    } else if(lastState.stage == STAGE.INITIAL) {
      return new State(STAGE.GREETING);
    } else if(lastState.stage == STAGE.GREETING) {
      return new State(STAGE.NAME);
    } else if(lastState.stage == STAGE.NAME) {
      return new State(STAGE.FRIEND);
    } else if(lastState.stage == STAGE.FRIEND) {
      if(lastState.repeated < 10) {
        return new State(STAGE.FRIEND, lastState.repeated + 1);
      }
      return new State(STAGE.FRIEND_REPLY);
    } else if(lastState.stage == STAGE.FRIEND_REPLY) {
      return new State(STAGE.PRESS);
    } else if(lastState.stage == STAGE.PRESS) {
      if(lastState.repeated < 5) {
        return new State(STAGE.PRESS, lastState.repeated + 1);
      }
      return new State(STAGE.ASTROLOGY);
    } else if(lastState.stage == STAGE.ASTROLOGY) {
      if(lastState.repeated < 10) {
        return new State(STAGE.ASTROLOGY, lastState.repeated + 1);
      }
      return new State(STAGE.END);
    } else if(lastState.stage == STAGE.END) {
      if(text == "結婚する") {
        return new State(STAGE.END_MARRIED);
      }
      return new State(STAGE.INITIAL);
    }
  },
  getMessage: (state) => {
    const conversationWithRinna = ['りんなとの雑談♥'];
    if(state.stage == STAGE.GREETING) {
      return conversation['RINA']['GREETING'];
    } else if(lastState.stage == STAGE.NAME) {
      return conversation['RINA']['NAME'];
    } else if(lastState.stage == STAGE.FRIEND) {
      if(lastState.repeated < 10) {
        return conversationWithRinna;
      }
      return conversation['RINA']['FRIEND'];
    } else if(lastState.stage == STAGE.FRIEND_REPLY) {
      return conversation['RINA']['FRIEND_REPLY'];
    } else if(lastState.stage == STAGE.PRESS) {
      if(lastState.repeated < 5) {
        return conversationWithRinna;
      }
      return conversation['RINA']['PRESS'];
    } else if(lastState.stage == STAGE.ASTROLOGY) {
      if(lastState.repeated < 10) {
        return conversationWithRinna;
      }
      return conversation['RINA']['ASTROLOGY'];
    } else if(lastState.stage == STAGE.END) {
      return conversation['RINA']['END'];
    } else if(state.stage == STAGE.END_MARRIED) {
      return ['結婚しちゃった☆', '- Fin -'];
    }
    return [];
  },
  State: State
};

class State {
  constructor(stage = STAGE.INITIAL, repeated = 0}) {
    this.stage = stage;
    this.repeated = repeated;
  }
}
