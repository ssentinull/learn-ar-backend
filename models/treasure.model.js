const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const treasureSchema = new Schema({
  name: String,
  description: String,
  url: String,
  isUnlocked: {
    type:Boolean,
    default: false
  }
});

module.exports = mongoose.model('Treasure', treasureSchema);