import React, { Component } from "react";
import PropTypes from "prop-types";

import Book from "./Book";

class BookShelf extends Component {

  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
          <div className="bookshelf-books">
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
          </div>
        </div>
      </div>
    )
  }
}

BookShelf.protoTypes = {
  // TODO: Identify props
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  hadleDbUpdate: PropTypes.func,
}

export default BookShelf