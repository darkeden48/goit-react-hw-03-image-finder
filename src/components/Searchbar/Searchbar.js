import PropTypes from "prop-types";
import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    input: "",
  };

  handleSubmit = (e) => {
    if (this.state.input === " ") {
      return;
    }
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.reset();
  };

  handleChange = (event) => {
    this.setState({
      input: event.currentTarget.value,
    });
  };

  reset = (e) => {
    this.setState({
      input: "",
    });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="input"
            value={this.state.input}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
