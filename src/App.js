import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";

class App extends Component {
  state = {};

  submite = (e) => {
    console.log("Posla-rodimaja");
  };

  render() {
    return <Searchbar onSubmit={this.submite} />;
  }
}

export default App;
