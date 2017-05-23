const mongoose = require('mongoose');
const validator = require('validator');
mongoose.Promise = global.Promise

const urlschema = new mongoose.Schema({
  url: {
    type: String,
    validate: [validator.isURL, 'Invalid URL']
  },
  short: String
});

module.exports = mongoose.model('Url', urlschema);
