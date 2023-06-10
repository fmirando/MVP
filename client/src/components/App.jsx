/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// CSS/bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container, Form, Button,
} from 'react-bootstrap';

// Supabase imports
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

// Component imports
import SongCarousel from './SongCarousel';
import LoadingIcon from './LoadingIcon';

// Importing sample data (temporary)
import sampleData from './sampleData/sampleData';

// Creating connection to supabase: supabase project url and key
const supabase = createClient('https://wlcwstpeuowhoknayute.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY3dzdHBldW93aG9rbmF5dXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwNzQ0NDgsImV4cCI6MjAwMTY1MDQ0OH0.7T2u8O81YdZD38jNrtI3zblv5_5KSxl6iOVJPvnY4jc');

const CDN_MUSIC_URL = 'https://wlcwstpeuowhoknayute.supabase.co/storage/v1/object/public/Music/';
const CDN_IMAGES_URL = 'https://wlcwstpeuowhoknayute.supabase.co/storage/v1/object/public/SongArt/';

function App() {
  // Old states (probably don't need all of these)
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  // New states
  // cardData holds an array of all current song cards
  const [cardData, setCardData] = useState([]);
  // const [artist, setArtist] = useState('');
  // const [songName, setSongName] = useState('');
  // const [genre, setGenre] = useState('');
  // const [daw, setDaw] = useState('');
  // const [bpm, setBpm] = useState('');
  // const [key, setKey] = useState('');
  // const [description, setDescription] = useState('');

  // This state is used when uploading a NEW SONG to DB
  const [songData, setSongData] = useState({
    artist: '',
    songName: '',
    releaseDate: '',
    genre: '',
    daw: '',
    bpm: '',
    key: '',
    description: '',
    songURL: '',
    imageURL: '',
  });

  // GET MUSIC FROM SUPABASE
  // TODO: Possibly refactor to grab from db instead
  // async function getMusic() {
  //   const { data, error } = await supabase
  //     .storage
  //     .from('Music')
  //     .list('');
  //   if (data !== null) {
  //     console.log('music', data);
  //     // setMusic(data.filter((song) => song.name !== '.emptyFolderPlaceholder'));
  //   } else {
  //     alert('Error grabbing music from Supabase :(', error);
  //   }
  // }

  // GET IMAGES FROM SUPABASE
  // May not need this anymore, just grab url from DB
  // May not need this anymore, just grab url from DB
  // async function getImages() {
  //   const { data, error } = await supabase
  //     .storage
  //     .from('SongArt')
  //     .list('');
  //   if (data !== null) {
  //     console.log('Images', data);
  //     // setImages(data.filter((image) => image.name !== '.emptyFolderPlaceholder'));
  //   } else {
  //     alert('Error grabbing images from Supabase :(', error);
  //   }
  // }

  // UPLOAD IMAGE TO SUPABASE
  // May not need this anymore, just grab url from DB
  async function uploadImage(img) {
    // setLoading(true);
    const { data, error } = await supabase.storage
      .from('SongArt')
      .upload(`${uuidv4()}.image`, img);
    if (error) {
      setLoading(false);
      console.error(error);
      alert('Error uploading image file to Supabase :(');
    } else {
      // setLoading(false);
      setSongData({ ...songData, imageURL: CDN_IMAGES_URL + data });
      alert('File successfully uploaded :)');
      console.log('You uploaded this: ', data);
    }
  }

  // UPLOAD SONG TO SUPABASE
  // Need to refactor so that it uploads to my DB as well
  async function uploadSong(song) {
    // setLoading(true);
    const { data, error } = await supabase.storage
      .from('Music')
      .upload(`${uuidv4()}.mp3`, song);
    if (error) {
      console.error(error);
      alert('Error uploading music file to Supabase :(');
    } else {
      // Also need to immediately add to cardData state so page rerenders with new song card
      setSongData({ ...songData, songURL: CDN_MUSIC_URL + data });
      setLoading(false);
      console.log('You uploaded this: ', data);
    }
  }

  const handleUpload = (song, image) => {
    // Uploads song and image, waits to get back links for Supabase to store them into state THEN
    // sends songData thru axios request to upload data into DB
    // This function will get invoked when user clicks 'Submit' button
    // Chain of events: upload song -> upload image -> axios request to send songData
    setLoading(true);
    uploadSong(song)
      .then(() => {
        uploadImage(image)
          .then(() => {
            console.log('handleUpload: songData ->', songData);
            axios.post('/postmusic', songData)
              .then(() => {
                setLoading(false);
                // Update cardData state so new song immediately renders on page
                setCardData([...cardData, songData]);
                alert('Successfully uploaded to database :)');
              })
              .catch((err) => {
                console.error('Something went wrong with axios.post...', err);
              });
          });
      })
      .catch((err) => {
        console.error('Something went wrong while uploading :(', err);
        alert('Uh oh, something went wrong while uploading...');
      });
  };

  const getData = () => {
    axios.get('/getmusic')
      .then(({ data }) => {
        console.log('getData results -> ', data);
        setCardData(data);
      })
      .catch((err) => {
        console.error('Error trying to grab music from db...', err);
      });
  };

  useEffect(() => {
    // Grabs data from db on initial render
    getData();
  }, []);

  // TODO: change upload form into a pop up modal instead
  return (
    <Container className="mt-1" style={{ width: '700px' }}>
      <h1 className="heading">WavCard</h1>
      <Button
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          margin: '20px',
        }}
        onClick={(e) => {
          e.preventDefault();
          setUpload(true);
        }}
      >
        Upload

      </Button>

      {loading && (
        <LoadingIcon />
      )}

      {upload && (
        <>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Upload your music here!</Form.Label>
            <Form.Control type="file" accept="audio/mpeg, audio/wav" onChange={(e) => setSongFile(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Upload your image here!</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Artist</Form.Label>
            <Form.Control type="text" value={songData.aritst} onChange={(e) => setSongData({ ...songData, artist: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Song Name</Form.Label>
            <Form.Control type="text" value={songData.songName} onChange={(e) => setSongData({ ...songData, songName: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Release Date</Form.Label>
            <Form.Control type="text" value={songData.releaseDate} onChange={(e) => setSongData({ ...songData, releaseDate: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control type="text" value={songData.genre} onChange={(e) => setSongData({ ...songData, genre: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>DAW Used</Form.Label>
            <Form.Control type="text" value={songData.daw} onChange={(e) => setSongData({ ...songData, daw: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>BPM</Form.Label>
            <Form.Control type="number" value={songData.bpm} onChange={(e) => setSongData({ ...songData, bpm: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Key</Form.Label>
            <Form.Control type="text" value={songData.key} onChange={(e) => setSongData({ ...songData, key: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={songData.description} onChange={(e) => setSongData({ ...songData, description: e.target.value })} />
          </Form.Group>
          <Button
            variant="primary"
            onClick={() => {
              if (songFile && imageFile) {
                handleUpload(songFile, imageFile);

                // Reset upload flag and states to hold song and image files
                setUpload(false);
                setSongFile(null);
                setImageFile(null);
              }
            }}
          >
            Submit
          </Button>
        </>
      )}
      <SongCarousel
        cardData={cardData}
      />

    </Container>
  );
}

export default App;
