import React from 'react';
import AudioPlayer from 'react-audio-player';

function SongCard({ song, image, CDN_MUSIC_URL, CDN_IMAGES_URL }) {
  // Renders a single song card
  // Artist, song name, genre, DAW used, bpm, key
  console.log('image', image);
  if (song && image) {
    return (
      <div
        style={{
          position: 'relative',
          width: '70%',
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <img
          src={CDN_IMAGES_URL + image.name}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.8)',
            boxSizing: 'border-box',
          }}
        >
          <AudioPlayer
            src={CDN_MUSIC_URL + song.name}
            controls
            controlsList="nodownload"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
      </div>
    );
  }
}

export default SongCard;
