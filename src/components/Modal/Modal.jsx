import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ modalImg, tags, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };
  return (
    <>
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.modal}>
          <img src={modalImg} alt={tags} />
        </div>
      </div>
    </>
  );
};
Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
