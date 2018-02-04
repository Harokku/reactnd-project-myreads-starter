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
      books: [],
    };
  }

  doSearch = (e) => {
    this.setState(
      { searchTerm: e.target.value },
      () => console.log(this.state)
    )
    BooksAPI.search(e.target.value)
    .then(result => { 
      this.setState({ books: result })
      console.log(result) 
    })
  }

  render() {
    return (
      <div className="search-books">
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
          <BooksList books={this.state.books} />
        </div>
      </div>
    )
  }
}

SearchPage.protoTypes = {
  booksState: PropTypes.array
}

export default SearchPage