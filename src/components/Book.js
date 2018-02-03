import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  // TODO: Evaluate if it's better to lift state up
  constructor(props) {
    super(props);
    this.state = {
      selectedShelf: props.shelf
    };
  }

  handleChange = (obj, e) => {
    this.props.handleDbUpdate(obj, e.target.value)
    this.setState({
      selectedShelf: e.target.value
    })
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + this.props.backgroundImage + ')' }}></div>
          <div className="book-shelf-changer">
            <select value={this.state.selectedShelf} onChange={(e) => this.handleChange(this.props, e)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.map(author => author)}</div>
      </div>
    )
  }
}

Book.protoTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  handleDbUpdate: PropTypes.func,
}

export default Book