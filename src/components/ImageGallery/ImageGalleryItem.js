import { Component } from "react";
import Loader from "../Loader/Loader";

export default class ImageGalleryItem extends Component {
  state = {
    image: null,
    loader: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const imagePsiho = this.props.input;
    const prev = prevProps.input;
    if (prev !== imagePsiho) {
      this.setState({ loader: true });
      fetch(
        `https://pixabay.com/api/?q=${imagePsiho}&page=1&key=24335530-1fa5676597020c031a07a1cad&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => response.json())
        .then((image) => this.setState({ image }))
        .finally(() => this.setState({ loader: false }));
      this.setState({ image: null });
      console.log(this.state.image);
    }
  }
  render() {
    return (
      <div>
        {this.props.input && <p>{this.props.input}</p>}
        {this.state.loader && <Loader />}
        {this.state.image && <div>{this.state.image}</div>}
      </div>
    );
  }
}
