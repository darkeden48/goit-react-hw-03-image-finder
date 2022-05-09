import PropTypes from "prop-types";
import React, { Component } from "react";

class Searchbar extends Component {
  state = {
    input: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { input } = this.state;
    if (input) {
      this.props.onSubmit(input);
      this.reset();
    }
  };

  handleChange = (event) => {
    this.setState({
      input: event.currentTarget.value.trim(),
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
