/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

// Creating connection to supabase: supabase project url and key

const supabase = createClient('https://wlcwstpeuowhoknayute.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsY3dzdHBldW93aG9rbmF5dXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYwNzQ0NDgsImV4cCI6MjAwMTY1MDQ0OH0.7T2u8O81YdZD38jNrtI3zblv5_5KSxl6iOVJPvnY4jc');

const CDN_MUSIC_URL = 'https://wlcwstpeuowhoknayute.supabase.co/storage/v1/object/public/music/';

function App() {
  async function uploadSong(e) {
    const musicFile = e.target.files[0];
    console.log('Upload file!');
    const { error } = await supabase.storage
      .from('Music')
      .upload(`${uuidv4()}.mp3`, musicFile);
    if (error) {
      console.error(error);
      alert('Error uploading music file to Supabase :(');
    } else {
      console.log('File successfully uploaded :)');
    }
  }

  return (
    <Container className="mt-5" style={{ width: '700px' }}>
      <h1>Music Gallery</h1>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Upload your music here!</Form.Label>
        <Form.Control type="file" accept="audio/mpeg, audio/wav" onChange={(e) => uploadSong(e)} />
      </Form.Group>
    </Container>
  );
}

export default App;
