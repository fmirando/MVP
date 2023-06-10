const mongoose = require('mongoose');

// PAIN: was getting a timeout error when model tried to save. Added below and works now
// mongoose.connect('mongodb://127.0.0.1:27017');

const SongCardSchema = mongoose.Schema({
  artist: String,
  songName: String,
  releaseDate: String,
  genre: String,
  daw: String,
  bpm: String,
  key: String,
  description: String,
  songURL: String,
  imageURL: String,
});

const SongData = mongoose.model('SongData', SongCardSchema);

module.exports = SongData;
