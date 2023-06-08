/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';

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
  const [music, setMusic] = useState([]);
  const [images, setImages] = useState([]);
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  // New states
  const [cardData, setCardData] = useState(sampleData);
  const [modalView, setModalView] = useState(false);

  // GET MUSIC FROM SUPABASE
  // TODO: Possibly refactor to grab from db instead
  async function getMusic() {
    const { data, error } = await supabase
      .storage
      .from('Music')
      .list('');
    if (data !== null) {
      console.log('music', data);
      setMusic(data.filter((song) => song.name !== '.emptyFolderPlaceholder'));
    } else {
      alert('Error grabbing music from Supabase :(', error);
    }
  }

  // GET IMAGES FROM SUPABASE
  // May not need this anymore, just grab url from DB
  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from('SongArt')
      .list('');
    if (data !== null) {
      console.log('Images', data);
      setImages(data.filter((image) => image.name !== '.emptyFolderPlaceholder'));
    } else {
      alert('Error grabbing images from Supabase :(', error);
    }
  }

  // UPLOAD IMAGE TO SUPABASE
  // May not need this anymore, just grab url from DB
  async function uploadImage(img) {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('SongArt')
      .upload(`${uuidv4()}.image`, img);
    if (error) {
      setLoading(false);
      console.error(error);
      alert('Error uploading image file to Supabase :(');
    } else {
      setLoading(false);
      alert('File successfully uploaded :)');
      console.log('You uploaded this: ', data);
    }
  }

  // UPLOAD SONG TO SUPABASE
  // Need to refactor so that it uploads to my DB as well
  async function uploadSong(song) {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from('Music')
      .upload(`${uuidv4()}.mp3`, song);
    if (error) {
      console.error(error);
      alert('Error uploading music file to Supabase :(');
    } else {
      setLoading(false);
      alert('File successfully uploaded :)');
      console.log('You uploaded this: ', data);
    }
    // getMusic();
  }

  // Possible refactor: send axios request to server instead
  useEffect(() => {
    getMusic();
    getImages();
  }, []);

  // TODO: change upload form into a pop up modal instead
  return (
    <Container className="mt-5" style={{ width: '700px' }}>
      <h1>Music Gallery</h1>
      <Button onClick={(e) => {
        e.preventDefault();
        setUpload(!upload);
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
          <Button
            variant="primary"
            onClick={() => {
              if (songFile && imageFile) {
                // Call the uploadSong and uploadImage functions here
                uploadSong(songFile);
                uploadImage(imageFile);

                // Reset the file inputs and update page with new data
                getMusic();
                getImages();
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
        music={music}
        images={images}
        CDN_MUSIC_URL={CDN_MUSIC_URL}
        CDN_IMAGES_URL={CDN_IMAGES_URL}
      />

    </Container>
  );
}

export default App;
