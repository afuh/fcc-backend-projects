const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const searchSchema = new mongoose.Schema({
  query: String,
  created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Search', searchSchema);
