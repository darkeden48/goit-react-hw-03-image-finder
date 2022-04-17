import PropTypes from "prop-types";
import React, { Component } from "react";
import { createPortal } from "react-dom";
import m from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };
  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
      console.log(e.currentTarget);
      console.log(e.target);
    }
  };

  render() {
    return createPortal(
      <div className={m.overlay} onClick={this.handleBackdropClick}>
        <div className="modal">
          {this.props.children}
          <img src="" alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
Modal.propTypes = {
  onClick: PropTypes.func,
};
