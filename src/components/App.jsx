import React from 'react';
import style from './App.module.css';
import { getImages } from 'Api/Api';
import SearchBar from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [totalHits, settotalHits] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleMakeRequest = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value;
    setImages([]);
    setPage(1);
    setQuery(searchValue);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    setError(false);
    try {
      getImages(query, page).then(response => {
        if (!response.data.total) {
          toast.error("Sorry, there's no such images", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        setImages(images => [...images, ...response.data.hits]);
        settotalHits(response.data.total);
        setisLoading(false);
        console.log(response.data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setisLoading({ isLoading: false });
    }
  }, [query, page]);

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const showModalImage = id => {
    const image = images.find(image => image.id === id);
    setShowModal({
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  return (
    <div className={style.App}>
      <SearchBar handleMakeRequest={handleMakeRequest} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} imageOnClick={showModalImage} />
      )}

      {totalHits > images.length && <Button handleMoreImage={loadMoreImages} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal
          modalImage={showModal.largeImageURL}
          tags={showModal.tags}
          closeModal={closeModalImage}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
