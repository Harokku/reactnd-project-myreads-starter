import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

class ShelfList extends Component {
  /**
   * @description Organize books in shelves
   * @param {array} books - Array of books containing a shelf property with actual shelf
   * @returns {object} whose key is shelf name and value is an array of books
   */
  divideBooksInShelfs = (books) => {
    return books.reduce((bookShelfs, book) => {
      if (!bookShelfs[book.shelf]) {
        bookShelfs[book.shelf] = [];
      }
      bookShelfs[book.shelf] = [book, ...bookShelfs[book.shelf]];
      return bookShelfs;
    }, {})
  }

  /**
   * @description Render shelfs
   * @param {books} books - Array of books containing a shelf property with actual shelf
   * @returns BookShelf component array
   */
  renderShelfs = (books) => {
    const shelfs = this.divideBooksInShelfs(books);
    return Object.keys(shelfs).map((key) => (
      <BookShelf
        key={key}
        shelfTitle={this.formatShelfName(key)}
        books={shelfs[key]}
        handleDbUpdate={this.props.hadleDbUpdate}
      />
    ))
  }

  /**
   * @description Format book's shelf value  to use as shelf title
   * @param {string} shelfTitle - shelf value (usually returned from api), ex: wantToRead
   * @returns {string} Ready to display title, ex: Want To Read
   */
  formatShelfName = (shelfTitle) => {
    return shelfTitle.charAt(0).toUpperCase() + shelfTitle.slice(1).replace(/([A-Z])/g, ' $1');
  }

  render() {
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.renderShelfs(this.props.books)}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='search'> Add a book</Link>
        </div>
      </div>
    )
  }
}

ShelfList.protoTypes = {
  books: PropTypes.array.isRequired,
  hadleDbUpdate: PropTypes.func,
}

export default ShelfList