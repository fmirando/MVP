// Importing db model/schema
const SongData = require('../models/SongGallery');

module.exports = {
  getMusic: (req, res) => {
    // Gets all song card data from DB
    SongData.find({})
      .then((music) => {
        console.log('GOT MUSIC >>> ', music);
        res.status(200).send(music);
      })
      .catch((err) => {
        console.error('Error getting music from db...', err);
        res.sendStatus(500);
      });
  },

  addSong: (req, res) => {
    // Adds song card data to DB
    console.log('From DB; request >>> ', req.body);
    SongData.create(req.body)
      .then(() => {
        console.log('Successfully saved new song :D');
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error('Error trying to create new song...', err);
        res.sendStatus(400);
      });
  },

  updateSong: (req, res) => {
    // Finds a song in DB and updates specific value(s)
  },

  deleteSong: (req, res) => {
    // Deletes a song object from DB
  },
};
