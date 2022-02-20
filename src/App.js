import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import ImageGalleryItem from "./components/ImageGallery/ImageGalleryItem";
import imageApi from "./services/image-api";

class App extends Component {
  state = {
    // input: "",
    // image:null,
    showModal: false,
    page: 1,
    error: null,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const nextName = this.props.input;
  //   const prevName = prevProps.input;

  //   if(nextName!==prevName){
  //     this.setState({status:"pending"});
  //     this.searchImage();
  //   }
  // }
  //     searchImage = () => {
  //       const {page,image} = this.state;
  //       const {input}=this.props;
  //     imageApi
  //   .fetchImage(input,page)
  //   .then(image=>{this.setState(({input,page})=>({image:input, status:"resolved", page: page + 1}));
  //   })
  //   .catch(error=>this.setState({error, status:'rejected'}))

  // }
  //   oipage = i =>{
  // this.setState({page:this.state.page+1})
  //   }

  handleSubmite = (input) => {
    this.setState({ input });
  };

  modalToggle = (el) => {
    this.setState((state) => ({ showModal: !state.showModal }));
  };

  render() {
    const { showModal, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmite} />
        <ImageGallery input={this.state.input} />

        {showModal && (
          <Modal closeModal={this.modalToggle}>
            <h1>Hello my Fiend</h1>
            <button type="button" onClick={this.modalToggle}>
              Close
            </button>
          </Modal>
        )}
        <button type="button" onClick={this.modalToggle}>
          рендер
        </button>
      </div>
    );
  }
}

export default App;
