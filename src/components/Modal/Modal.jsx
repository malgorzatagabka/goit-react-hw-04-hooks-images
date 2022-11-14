import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ modalImage, tags, closeModal }) => {
  useEffect(() => {
    const handleKeyPress = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  const backdropOnClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <div className={style.overlay} onClick={backdropOnClick}>
      <div className={style.Modal}>
        <img src={modalImage} className={style.modalImg} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
