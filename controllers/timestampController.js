const moment = require('moment');

exports.homeTime = (req, res) => {
  res.render('timestamp', { title: "Timestamp Microservice"})
}

exports.resolveTime = (req, res) => {
  const date = req.params.time;
  const isNum = /^\d+$/.test(date);
  const isDateinMs = date.length > 10 ? date/1000 : date;
  const unix = (date) => moment(date).format("X");
  const nat = (date) => moment.unix(date).format("MMMM Do YYYY");

  const time = {
    unix: null,
    natural: null
  }

  if (isNum) {
    time.unix = date;
    time.natural = nat(isDateinMs);
  }
  else if (!isNum && moment(date).isValid()) {
    time.unix = unix(date);
    time.natural = date;
  }

  res.json(time);
}
