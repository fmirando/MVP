import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-modal';

function InfoModal({ isModalOpen, setIsModalOpen }) {
  return ReactDom.createPortal(
    <Modal
      className="modal"
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      AHHHHHHHHHHHHHHHHHHHHHHH
    </Modal>,
    document.getElementById('portal'),
  );
}

export default InfoModal;
