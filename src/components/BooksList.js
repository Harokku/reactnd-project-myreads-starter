import React, { Component } from "react";
import PropTypes from "prop-types";

import Book from "./Book";

class BooksList extends Component {

  render() {
    return (
      <ol className="books-grid">
        {this.props.books && this.props.books.map(book => (
          <li key={book.id}>
            <Book
              id={book.id}
              title={book.title}
              authors={book.authors}
              backgroundImage={book.imageLinks.smallThumbnail}
              shelf={book.shelf}
              handleDbUpdate={this.props.handleDbUpdate}
            />
          </li>
        ))}
      </ol>
    )
  }
}

BooksList.protoTypes = {
  // TODO: Identify props
  books: PropTypes.array.isRequired,
  hadleDbUpdate: PropTypes.func,
}

export default BooksList