import { useState } from 'react';
import { Modal } from '../Modal';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({ image: {webformatURL, tags, largeImageURL} }) {  
  const [shownModal, setShownModal] = useState(false);
  
  const onClickImageModal = () => {
    setShownModal(!shownModal);
  };

  return (
    <li className={css.GalleryItem}>
      <img
        className={css.GalleryItemImage}
        onClick={onClickImageModal}
        src={webformatURL}
        alt={tags}          
      />

      {shownModal &&
        <Modal
          onClose={onClickImageModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />          
      }        
    </li>
  );  
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageUrl: PropTypes.string.isRequired,
    })
  ),
};