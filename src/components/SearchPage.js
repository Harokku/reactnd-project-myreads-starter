import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksList from "./BooksList";

import * as BooksAPI from './../BooksAPI'

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResult: [],
    };
  }

  doSearch = (e) => {
    this.setState(
      { searchTerm: e.target.value },
    )
    BooksAPI.search(e.target.value)
      .then(result => {
        this.setState({ searchResult: result })
      })
  }

  /**
   * @description Assign already in library book's shelf to search results to keep em in sync
   * @param {array} books - Array of books object representing actual library
   * @param {array} results - Array of books object to merge into
   * @returns {array} new array containing search result updated with actual library shelf status
   */
  mapShelfToSearchResult = (books, results) => {
    return results.map(result => (books.find(book => book.id === result.id) || result));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input value={this.state.searchTerm} onChange={this.doSearch} type="text" placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchResult.length > 0 && <BooksList
            books={this.mapShelfToSearchResult(this.props.books, this.state.searchResult)}
            handleDbUpdate={this.props.handleDbUpdate}
          />
          }
        </div>
      </div>
    )
  }
}

SearchPage.protoTypes = {
  books: PropTypes.array.isRequired,
  handleDbUpdate: PropTypes.func,
}

export default SearchPage