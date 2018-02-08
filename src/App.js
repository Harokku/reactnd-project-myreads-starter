import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from "react-router-dom";
import ShelfList from "./components/ShelfList";
import SearchPage from "./components/SearchPage";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  dbUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => BooksAPI.getAll().then((books) => this.setState({ books })))
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <ShelfList
            books={this.state.books}
            hadleDbUpdate={this.dbUpdateBook} />
        )} />
        <Route exact path='/search' render={() => (
          <SearchPage
            books={this.state.books}
            handleDbUpdate={this.dbUpdateBook}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
