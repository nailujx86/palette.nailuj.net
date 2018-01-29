var mongoose = require('mongoose');

module.exports = mongoose.model('Palette', {
  name: String,
  user: String,
  colors: Array
},'colors');