const moment = require("moment");
function MessageFromet(user, text) {
  return {
    user,
    text,
    time: moment().format("h:m a"),
  };
}

module.exports = MessageFromet;
