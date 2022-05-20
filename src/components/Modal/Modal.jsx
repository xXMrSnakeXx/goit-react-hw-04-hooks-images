import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export const Modal = ({ modalImg, tags, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
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
// export class Modal extends Component {
//   static propTypes = {
// onCloseModal: PropTypes.func.isRequired,
// modalImg: PropTypes.string.isRequired,
// tags: PropTypes.string.isRequired,
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

// handleKeyDown = e => {
//   if (e.code === 'Escape') {
//     this.props.onCloseModal();
//   }
// };

// handleBackdropClick = event => {
//   if (event.currentTarget === event.target) {
//     this.props.onCloseModal();
//   }
// };

//   render() {
//     const { modalImg, tags } = this.props;
// return (
//   <>
//     <div className={s.overlay} onClick={this.handleBackdropClick}>
//       <div className={s.modal}>
//         <img src={modalImg} alt={tags} />
//       </div>
//     </div>
//   </>
// );
//   }
// }
