import React, { Component } from "react";
//import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import BookShelf from "./BookShelf";

import * as BooksAPI from './../BooksAPI'

class ShelfList extends Component {
  // TODO: Evaluate if it's better to lift state up
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  // Database handling funtions
  dbUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll().then((books) => this.setState({ books })))
  }

  // Take an array ok books object and organize it in shelfs
  // Return an object in the form: 
  // shelf: array(books)
  divideBooksInShelfs = (books) => {
    return this.state.books.reduce((bookShelfs, book) => {
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
          handleDbUpdate={this.dbUpdateBook}
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
              {this.renderShelfs(this.state.books)}
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

/*BookList.protoTypes = {

}*/

export default ShelfList