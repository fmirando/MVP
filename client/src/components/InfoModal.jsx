import React, { useState } from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'react-bootstrap';

function InfoModal({ song, setIsModalOpen }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSong, setEditedSong] = useState(song);

  // Will convert data to input fields
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Will remove input fields
  const handleCancel = () => {
    setIsEditing(false);
    setEditedSong(song);
  };

  // Will send request to server to change data in db
  const handleSave = () => {
    const editParams = {
      oldSong: song,
      newSong: editedSong,
    };

    axios.patch('/updatemusic', editParams)
      .then(() => {
        console.log('New data successfully saved :)');
        setIsEditing(false);
        setEditedSong(editParams.newSong);
      })
      .catch((err) => {
        console.error('Uh oh, couldn\'t edit song...', err);
        setEditedSong(song);
      });
  };

  return ReactDom.createPortal(
    <div
      className="modal"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
      }}
    >
      <button
        type="button"
        onClick={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        <AiOutlineClose />
      </button>

      <div style={{
        padding: '10%',
        fontSize: '15px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >

        {isEditing ? (
          <>
            <input
              type="text"
              name="artist"
              value={editedSong.artist}
              onChange={(e) => setEditedSong({ ...editedSong, artist: e.target.value })}
            />
            <input
              type="text"
              name="songName"
              value={editedSong.songName}
              onChange={(e) => setEditedSong({ ...editedSong, songName: e.target.value })}
            />
            <input
              type="text"
              name="releasedate"
              value={editedSong.releaseDate}
              onChange={(e) => setEditedSong({ ...editedSong, releaseDate: e.target.value })}
            />
            <input
              type="text"
              name="genre"
              value={editedSong.genre}
              onChange={(e) => setEditedSong({ ...editedSong, genre: e.target.value })}
            />
            <input
              type="text"
              name="daw"
              value={editedSong.daw}
              onChange={(e) => setEditedSong({ ...editedSong, daw: e.target.value })}
            />
            <input
              type="number"
              name="bpm"
              value={editedSong.bpm}
              onChange={(e) => setEditedSong({ ...editedSong, bpm: e.target.value })}
            />
            <input
              type="text"
              name="key"
              value={editedSong.key}
              onChange={(e) => setEditedSong({ ...editedSong, key: e.target.value })}
            />
            <textarea
              name="description"
              value={editedSong.description}
              onChange={(e) => setEditedSong({ ...editedSong, description: e.target.value })}
              style={{ height: '80px', resize: 'vertical' }}
            />
            <div style={{ marginTop: '10px' }}>
              <Button type="button" onClick={handleSave}>
                Save
              </Button>
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3>
              Artist:
              {' '}
              {editedSong.artist}
            </h3>
            <h4>
              Song Name:
              {' '}
              {editedSong.songName}
            </h4>
            <p>
              Release Date:
              {' '}
              {editedSong.releaseDate}
            </p>
            <p>
              Genre:
              {' '}
              {editedSong.genre}
            </p>
            <p>
              DAW used:
              {' '}
              {editedSong.daw}
            </p>
            <p>
              BPM:
              {' '}
              {editedSong.bpm}
            </p>
            <p>
              Key:
              {' '}
              {editedSong.key}
            </p>
            <p>
              Description:
              {' '}
              {editedSong.description}
            </p>
            <div style={{ marginTop: '10px' }}>
              <Button type="button" onClick={handleEdit}>
                Edit
              </Button>
            </div>
          </>
        )}

      </div>
    </div>,
    document.getElementById('portal'),
  );
}

export default InfoModal;
