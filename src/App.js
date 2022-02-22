import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    input: "",
    showModal: false,
    modalImage: null,
    modalAlt: null,
  };

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
  render() {
    const { showModal, modalAlt, modalImage } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmite} />
        <ImageGallery input={this.state.input} onOpen={this.onOpenLargeImage} />

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
