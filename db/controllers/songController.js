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
    console.log('updateSong req.body: ', req.body);
    const { oldSong, newSong } = req.body;
    SongData.findOneAndUpdate(oldSong, newSong)
      .then(() => {
        console.log('updateSong: song successfully updated :)');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error('updateSong: Unable to update song in db :(', err);
        res.sendStatus(500);
      });
  },

  deleteSong: (req, res) => {
    // Deletes a song object from DB
    console.log('Controller: req.body >>> ', req.body);
    SongData.deleteOne({ songName: req.body.songName })
      .then(() => {
        console.log('Controller: successfully deleted from db!');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error('Controller: unable to delete from db...', err);
      });
  },
};
