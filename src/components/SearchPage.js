import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksList from "./BooksList";

import * as BooksAPI from './../BooksAPI'

class SearchPage extends Component {
  // TODO: Evaluate if it's better to lift state up
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResult: [],
    };
  }

  doSearch = (e) => {
    this.setState(
      { searchTerm: e.target.value },
      //() => console.log(this.state)
    )
    BooksAPI.search(e.target.value)
      .then(result => {
        this.setState({ searchResult: result })
        //console.log(result)
      })
  }

  mapShelfToSearchResult = (books, results) => {
    console.log(books)
    console.log(results)
    console.log({ ...results[1], ...books[1] })
    return results.map(result => (books.find(book => book.id === result.id) || result))
  }

  render() {
    return (
      <div className="search-books">
        {/*this.mapShelfToSearchResult(this.props.books, this.state.searchResult)*/}
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input value={this.state.searchTerm} onChange={this.doSearch} type="text" placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <BooksList
            books={this.mapShelfToSearchResult(this.props.books, this.state.searchResult)}
            handleDbUpdate={this.props.handleDbUpdate}
          />
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