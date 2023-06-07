import React from 'react';
import AudioPlayer from 'react-audio-player';

function SongCard({ song, CDN_MUSIC_URL, CDN_IMAGES_URL }) {
  // Renders a single song card
  // Artist, song name, genre, DAW used, bpm, key
  return (
    <>
      <img src={CDN_IMAGES_URL + '7023638e-80ca-4f9d-ae4f-962ad297f3b4.image'} />
      <AudioPlayer src={CDN_MUSIC_URL + song.name} controls controlsList="nodownload" />
    </>
  );
}

export default SongCard;
