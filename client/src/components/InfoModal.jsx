import React from 'react';
import ReactDom from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';

function InfoModal({ song, isModalOpen, setIsModalOpen }) {
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
        onClick={() => setIsModalOpen(false)}
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
      <h3>
        Artist:
        {' '}
        {song.artist}
      </h3>
      <h4>
        Song Name:
        {' '}
        {song.songName}
      </h4>
      <p>
        Genre:
        {' '}
        {song.genre}
      </p>
      <p>
        DAW used:
        {' '}
        {song.daw}
      </p>
      <p>
        BPM
        {' '}
        {song.bpm}
      </p>
      <p>
        Key:
        {' '}
        {song.key}
      </p>
      <p>
        Description:
        {' '}
        {song.description}
      </p>
    </div>,
    document.getElementById('portal'),
  );
}

export default InfoModal;
