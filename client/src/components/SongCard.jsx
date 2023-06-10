import React, { useState } from 'react';
import axios from 'axios';
import AudioPlayer from 'react-audio-player';
import { Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import InfoModal from './InfoModal';

function SongCard({ song, cardData, setCardData }) {
  // Renders a single song card
  // Artist, song name, genre, DAW used, bpm, key
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!song.songURL || !song.imageURL) {
    return null;
  }

  const handleDelete = (songToDelete) => {
    const confirmed = window.confirm('Are you sure you want to delete this song? D:');
    if (confirmed) {
      const deleted = { songName: song.songName };
      axios.delete('/deletemusic', { data: deleted })
        .then(() => {
          alert('Successfully deleted song');
          // TODO: reset cardData state so that page re renders without song that was just deleted
          setCardData(cardData.filter((updated) => updated.songName !== deleted.songName));
        })
        .catch((err) => {
          console.error('Unable to delete song...', err);
        });
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '400px',
        paddingTop: '220%', // Adjust the top padding to control the height
        borderRadius: '14px',
        overflow: 'visible',
      }}
    >

      {isModalOpen && (
        <InfoModal song={song} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}

      <img
        src={song.imageURL}
        alt="song-art"
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px',
        }}
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
        <BsThreeDotsVertical
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            transform: 'scale(1.8)',
          }}
          onClick={() => handleDelete(song)}
        />

        <Button type="button" onClick={() => setIsModalOpen(true)}>i</Button>
        <h3 style={{ textAlign: 'center' }}>{song.songName}</h3>

        <AudioPlayer
          src={song.songURL}
          controls
          controlsList="nodownload"
          style={{
            width: '100%', borderRadius: '8px', transform: 'scale(0.9)',
          }}
        />
        <style>
          {`
            .rp-progress {
              width: 100%;
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default SongCard;
