var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  logID: String,
  activity: {
    time: String,
    text: String
  }
});

var log = mongoose.model('logs', logSchema);
exports.log = log;
