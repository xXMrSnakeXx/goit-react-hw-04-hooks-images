import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ image, onModalOpen }) => {
  const { webformatURL, largeImageURL, tags } = image;
  const handleClick = modalImg => {
    onModalOpen(modalImg, tags);
  };
  return (
    <li className={s.item} onClick={() => handleClick(largeImageURL, tags)}>
      <img className={s.itemImage} src={webformatURL} alt={tags} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};
