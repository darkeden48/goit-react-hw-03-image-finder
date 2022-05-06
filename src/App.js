import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import { fetchImage } from "./services/image-api";
import Loader from "./components/Loader/Loader";

class App extends Component {
  state = {
    input: "",
    showModal: false,
    modalImage: null,
    modalAlt: null,
    page: 1,
    showLoadMoreBtn: null,
    error: null,
    status: "idle",
    image: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.state.input;
    const prevName = prevState.input;
    console.log(nextName);
    if (nextName !== prevName) {
      this.setState({ image: [], page: 1 });
    }
    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({
        status: "pending",
        showLoadMoreBtn: false,
      });

      const { page, input } = this.state;

      fetchImage(input, page)
        .then((data) => {
          if (data.hits.length === 0) {
            this.setState({ showLoadMoreBtn: false, status: "rejected" });
            return;
          }

          this.setState({
            image:
              this.state.page === 1
                ? data.hits
                : [...prevState.image, ...data.hits],
            showLoadMoreBtn: true,
            status: "resolved",
          });

          if (prevState.page !== page) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }

          if (data.hits.length < 15) {
            this.setState({ showLoadMoreBtn: false });
          }
          return;
        })

        .catch((error) => this.setState({ error, status: "rejected" }));
    }
  }

  handleSubmite = (input) => {
    this.setState({ input });
  };

  modalToggle = (el) => {
    this.setState((state) => ({ showModal: !state.showModal }));
  };

  onOpenLargeImage = (selectedImage, selectedAlt) => {
    this.setState({ modalImage: selectedImage, modalAlt: selectedAlt });
    this.modalToggle();
  };
  onLoadMoreClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const {
      showModal,
      modalAlt,
      modalImage,
      showLoadMoreBtn,
      status,
      input,
      image,
    } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmite} />
        {status === "idle" && <p>Введите название картинки</p>}
        {status === "resolved" && (
          <ImageGallery onOpen={this.onOpenLargeImage} image={image} />
        )}
        {status === "pending" && <Loader />}
        {status === "rejected" && (
          <h1>Картинок по запросу '{input}' не найдено</h1>
        )}
        {showLoadMoreBtn && <Button onClick={this.onLoadMoreClick} />}
        {showModal && (
          <Modal closeModal={this.modalToggle}>
            <img src={modalImage} alt={modalAlt} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
