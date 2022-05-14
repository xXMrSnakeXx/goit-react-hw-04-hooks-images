import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    query: '',
    isModal: false,
    modalImg: null,
    tags: '',
  };

  changeSearch = query => {
    this.setState({ query: query });
  };
  toggleModal = (modalImg = null, tags = '') => {
    this.setState(prevState => ({
      isModal: !prevState.isModal,
      modalImg,
      tags,
    }));
  };
  render() {
    const { query, isModal, modalImg, tags } = this.state;
    return (
      <div className={s.App}>
        <ToastContainer autoClose={3000} />
        <Searchbar changeSearch={this.changeSearch} />
        <ImageGallery query={query} toggleModal={this.toggleModal} />
        {isModal && (
          <Modal
            modalImg={modalImg}
            onCloseModal={this.toggleModal}
            tags={tags}
          />
        )}
      </div>
    );
  }
}
