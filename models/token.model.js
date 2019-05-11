const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  value: String
});

module.exports = mongoose.model('Token', tokenSchema);