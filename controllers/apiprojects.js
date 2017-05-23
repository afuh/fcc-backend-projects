const moment = require('moment');
const parser = require('ua-parser-js');
const requestIp = require('request-ip');
const validator = require('validator');
const crypto = require('crypto');
const mongoose = require('mongoose');


/* ==== Timestamp Microservice ==== */
exports.timestamp = (req, res) => {
  res.render('timestamp', { title: "Timestamp Microservice" })
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

/* ==== Request header parser Microservice ==== */
exports.whoami = (req, res) => {
  const os = parser(req.headers['user-agent']).ua;
  const ip = requestIp.getClientIp(req);
  const lang = req.get('accept-language').slice(0, 2);

  const whoami = { ip, lang, os }

  res.json(whoami)
}


/* ==== URL Shortener Microservice Incomplete ==== */
exports.shrink = (req, res) => {
  res.render('url', { title: "URL Shortener Microservice" })
}

const Url = mongoose.model('Url');

exports.shrinkit = async (req, res) => {
  const url = req.url.replace(/\/shrink\//, '')
  const isUrl = validator.isURL(url, {  protocols: ['http','https'], require_protocol: true });

  if (isUrl) {
    const short = crypto.randomBytes(2).toString('hex');
    const saveUrl = await new Url({ url, short }).save();

    const showURLs = {
      original: url,
      short: `${process.env.URL}/shrink-it/${short}`
    }
    res.json( showURLs )
  } else {
    res.json({ "error": "Apparently there was an error with that URL" });
    return;
  }
}

exports.findURL = async (req, res) => {
  const url = await Url.findOne({
    short: req.params.id
  });

  if (url) {
    res.redirect(url.url)
  }
  else {
    res.json({ "error": "That URL is not in the database" });
  }

}
