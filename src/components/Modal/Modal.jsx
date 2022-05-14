import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { modalImg, tags } = this.props;
    return (
      <>
        <div className={s.overlay} onClick={this.handleBackdropClick}>
          <div className={s.modal}>
            <img src={modalImg} alt={tags} />
          </div>
        </div>
      </>
    );
  }
}
