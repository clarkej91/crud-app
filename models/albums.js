const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
  name: String,
  title: String,
  description: String,
  img: String,
  link: String
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album
