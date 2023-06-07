const mongoose = require('mongoose');

// PAIN: was getting a timeout error when model tried to save. Added below and works now
mongoose.connect('mongodb://127.0.0.1:27017');
mongoose.set('useFindAndModify', false);

const SongCardSchema = mongoose.Schema({
  artist: String,
  songName: String,
  genre: String,
  bpm: Number,
  key: String,
  description: String,
  songURL: String,
  imageURL: String,
});

const SongData = mongoose.model('SongData', SongCardSchema);

module.exports = SongData;
