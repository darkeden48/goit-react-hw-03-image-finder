import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
// import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGallery/ImageGalleryItem";
// import apiImage from "./services/api"

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { Audio } from  'react-loader-spinner'
class App extends Component {
  state = {
    gallery: [],
    query: "",
    input: "",
  };

  handleSubmite = (input) => {
    this.setState({ input });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmite} />

        <ImageGalleryItem input={this.state.input} />
      </div>
    );
  }
}

export default App;
