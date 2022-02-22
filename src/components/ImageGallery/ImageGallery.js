import { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { fetchImage } from "../../services/image-api";
import I from "./ImageGallery.module.css";
import PropTypes from "prop-types";

export default class ImageGallery extends Component {
  state = {
    image: [],
    status: "idle",
    error: null,
    page: 1,
    showLoadMoreBtn: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.input;
    const prevName = prevProps.input;

    if (nextName !== prevName) {
      this.setState({ image: [], page: 1 });
    }
    if (prevName !== nextName || prevState.page !== this.state.page) {
      this.setState({
        // status: "pending",
        showLoadMoreBtn: false,
      });

      const { page } = this.state;

      fetchImage(this.props.input, page)
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
  onLoadMoreClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { image, status, showLoadMoreBtn } = this.state;

    if (status === "idle") {
      return <p>Введите название картинки</p>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <div>
          {image && (
            <ul className={I.list}>
              {image.map((el) => (
                <ImageGalleryItem
                  key={el.id}
                  webformatURL={el.webformatURL}
                  tags={el.tags}
                  largeImageURL={el.largeImageURL}
                  onSelect={this.props.onOpen}
                />
              ))}
            </ul>
          )}
          {showLoadMoreBtn && <Button onClick={this.onLoadMoreClick} />}
        </div>
      );
    }
    if (status === "rejected") {
      return <h1>Картинок по запросу '{this.props.input}' не найдено</h1>;
    }
  }
}
ImageGallery.propTypes = {
  image: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
