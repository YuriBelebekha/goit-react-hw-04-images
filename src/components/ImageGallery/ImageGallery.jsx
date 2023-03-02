import { ImageGalleryItem } from "components/ImageGalleryItem";
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export function ImageGallery({ images }) {  
  return (
    <ul className={css.ImageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
        />
      ))}
    </ul>
  )
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};