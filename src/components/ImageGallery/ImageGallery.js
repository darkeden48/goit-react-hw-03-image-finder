import { Component } from "react";
// import Loader from "../Loader/Loader";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "../Loader/Loader";
import imageApi from "../../services/image-api";

export default class ImageGallery extends Component {
  state = {
    image: null,
    status: "idle",
    error: null,
    input: null,
    page: 1,
    button: null,
    gallery: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const nextName = this.props.input;
    const prevName = prevProps.input;
    const gallery = prevState.image;
    const { input, page, image, button } = this.state;

    if (nextName !== prevName) {
      this.setState({ status: "pending" });
      this.searchImage();
    }
  }

  searchImage = () => {
    const { input, page, image, gallery } = this.state;
    imageApi
      .fetchImage(this.props.input, page)
      .then((image) =>
        this.setState({ image, status: "resolved", page: this.state.page })
      )
      .catch((error) => this.setState({ error, status: "rejected" }));
  };

  onClickElem = (page) => {
    // this.props.page(this.state.page);

    this.searchImage();
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { image, error, status, page } = this.state;

    if (status === "idle") {
      return <p>Введите название картинки</p>;
    }
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "resolved") {
      return (
        <div>
          <ImageGalleryItem image={image} />

          <button type="button" onClick={this.onClickElem}>
            hh
          </button>
        </div>
      );
    }
    if (status === "rejected") {
      return <h1>{error}</h1>;
    }
  }
}
