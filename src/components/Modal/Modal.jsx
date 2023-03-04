import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

export function Modal({ largeImageURL, tags, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => window.removeEventListener('keydown', keyDown);
  });

  const keyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    };
  };

  const onClickOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    };
  };
    
  return createPortal(      
    <div className={css.Overlay} onClick={onClickOverlayClose}>
      <div className={css.Modal}>
        <img
          src={largeImageURL}
          alt={tags}
        />
      </div>
    </div>,      
    ModalRoot      
  );  
}

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};