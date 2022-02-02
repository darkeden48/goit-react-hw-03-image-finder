import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGallery";
class App extends Component {
  state = {
    gallery: [],
    q: "",
  };

  componentDidMount() {
    fetch(
      "https://pixabay.com/api/?q=cat&page=1&key=24335530-1fa5676597020c031a07a1cad&image_type=photo&orientation=horizontal&per_page=12"
    )
      .then((res) => res.json())
      .then((q) => console.log(q.hits[1].webformatURL));
  }
  submite = (e) => {
    console.log("Posla-rodimaja");
  };

  render() {
    return (
      (<Searchbar onSubmit={this.submite} />),
      (<ImageGallery gallery={this.state.gallery} />)
    );
  }
}

export default App;
