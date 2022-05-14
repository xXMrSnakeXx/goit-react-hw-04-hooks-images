import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { fetchImages } from 'Pixabay/fetchImages';
import { Loader } from 'components/Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from 'components/Button';

import s from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalImg: 0,
    loading: false,
    error: null,
  };
  static propTypes = {
    query: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query && this.props.query !== '') {
      this.setState({ images: [], page: 1 });
      this.loadImages();
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.loadImages();
    }
  }

  loadImages = () => {
    const { page } = this.state;
    const { query } = this.props;
    this.setState({ loading: true, error: null });
    fetchImages(query, page)
      .then(images => {
        if (!images.hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          totalImg: images.totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleLoadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, error, images, totalImg } = this.state;
    const { toggleModal } = this.props;

    return (
      <>
        <ul className={s.gallery}>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              onModalOpen={toggleModal}
              image={image}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {images.length > 0 && images.length < totalImg && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}

        {error && <>{error.message}</>}
      </>
    );
  }
}
