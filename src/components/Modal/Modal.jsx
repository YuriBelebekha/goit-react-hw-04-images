import css from './Modal.module.css';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#ModalRoot');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  };

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    };
  };

  onClickOverlayClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    };
  };

  render() {
    const { largeImageURL, tags } = this.props;
    
    return createPortal(      
      <div className={css.Overlay} onClick={this.onClickOverlayClose}>
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
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};