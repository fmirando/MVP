require('dotenv').config();
const path = require('path');

const express = require('express');
const morgan = require('morgan');

const db = require('../db/db');
const songControllers = require('../db/controllers/songController');

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.get('/getmusic', songControllers.getMusic);

app.post('/postmusic', songControllers.addSong);

app.post('updatemusic', songControllers.updateSong);

app.delete('/deletemusic', songControllers.deleteSong);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server available at http://localhost${PORT}`);
});
