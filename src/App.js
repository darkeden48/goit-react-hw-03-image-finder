import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

class App extends Component {
  state = {};

  submite = (e) => {
    console.log("Posla-rodimaja");
  };

  render() {
    return (<Searchbar onSubmit={this.submite} />), (<ImageGallery />);
  }
}

export default App;
