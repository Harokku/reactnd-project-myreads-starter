import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

class ShelfList extends Component {
  // Take an array ok books object and organize it in shelfs
  // Return an object in the form: 
  // shelf: array(books)
  divideBooksInShelfs = (books) => {
    return books.reduce((bookShelfs, book) => {
      if (!bookShelfs[book.shelf]) {
        bookShelfs[book.shelf] = []
      }
      bookShelfs[book.shelf] = [book, ...bookShelfs[book.shelf]]
      return bookShelfs
    }, {})
  }

  // TODO: Check is it's possible to merge this into divideBooksInShelfs
  renderShelfs = (books) => {
    const shelfs = this.divideBooksInShelfs(books)
    let compToRender = []
    for (let shelf in shelfs) {
      compToRender = [
        ...compToRender,
        <BookShelf
          key={shelf}
          shelfTitle={this.formatShelfName(shelf)}
          books={shelfs[shelf]}
          handleDbUpdate={this.props.hadleDbUpdate}
        />
      ]
    }
    return compToRender
  }

  formatShelfName = (shelfTitle) => {
    return shelfTitle.charAt(0).toUpperCase() + shelfTitle.slice(1).replace(/([A-Z])/g, ' $1')
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