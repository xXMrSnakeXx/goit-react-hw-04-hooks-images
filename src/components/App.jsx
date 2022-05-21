import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import s from './App.module.css';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { fetchImages } from 'services/fetchImages';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImg, setTotalImg] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    fetchImages(query, page)
      .then(images => {
        const pictures = images.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        if (!images.hits.length) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        if (page === 1 && images.hits.length) {
          toast.success(`Hooray! We found ${images.totalHits} images.`);
        }
        const totalPage = images.totalHits / (page * images.hits.length);
        if (totalPage <= 1) {
          toast.success(
            `We're sorry, but you've reached the end of search results.`
          );
        }
        setImages(images => [...images, ...pictures]);
        setTotalImg(images.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [page, query]);

  const handleLoadMore = e => {
    setPage(page + 1);
  };
  const changeSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };
  const toggleModal = (modalImg, tags) => {
    setIsModal(!isModal);
    setModalImg(modalImg);
    setTags(tags);
  };
  return (
    <div className={s.App}>
      <ToastContainer autoClose={3000} />
      <Searchbar changeSearch={changeSearch} />
      <ImageGallery images={images} toggleModal={toggleModal} />
      {loading && <Loader />}
      {images.length > 0 && images.length < totalImg && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {isModal && (
        <Modal modalImg={modalImg} onCloseModal={toggleModal} tags={tags} />
      )}
      {error && <>{error.message}</>}
    </div>
  );
};
