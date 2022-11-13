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

const INITIAL_STATE = {
  images: [],
  error: '',
  page: 1,
  perPage: 12,
  isLoading: false,
  query: '',
  totalHits: '',
};

export default class App extends React.Component {
  state = { ...INITIAL_STATE };

  handleMakeRequest = e => {
    e.preventDefault();
    const searchValue = e.target.elements.searchValue.value;
    this.setState({ images: [], query: searchValue, page: 1 });
    e.target.reset();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      try {
        const { query, page } = this.state;
        const fetchData = await getImages(query, page);
        if (!fetchData.total) {
          toast.error("Sorry, there's no such images", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        this.setState(({ images }) => ({
          images: [...images, ...fetchData.hits],
          totalHits: fetchData.total,
        }));
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  LoadMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  showModalImage = id => {
    const image = this.state.images.find(image => image.id === id);
    this.setState({
      showModal: {
        largeImageURL: image.largeImageURL,
        tags: image.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleMakeRequest);
  }

  render() {
    const { images, isLoading, totalHits, showModal } = this.state;

    return (
      <div className={style.App}>
        <SearchBar handleMakeRequest={this.handleMakeRequest} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery images={images} imageOnClick={this.showModalImage} />
        )}

        {totalHits > images.length && (
          <Button handleMoreImage={this.LoadMoreImages} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            modalImage={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

//Problem: po wpisaniu frazy, która nie zostanie wyszukana i po ponownym kliknięciu pojawia się strona z randomowymi obrazami i później po drugi  kliknięciu enter pojawia się botton loadMore- nie wiem w czym jest problem-prosze o sugestie..
