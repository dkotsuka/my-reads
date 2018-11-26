import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => books.map((book) => {
      this.setState(state => state[book.shelf].push(book))
    }))
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book,shelf).then(() => {
        this.setState(state => {state[book.shelf].filter((b) => b.id !== book.id)})
        this.setState(state => {state[shelf].push(book)})
    })
  }

  render() {
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <BookList books={this.state.currentlyReading} 
                  shelfTitle='Currently Reading' 
                  onChangeShelf={this.changeShelf}/>

                <BookList books={this.state.wantToRead} 
                  shelfTitle='Want to Read' 
                  onChangeShelf={this.changeShelf}/>

                <BookList books={this.state.read} 
                  shelfTitle='Read' 
                  onChangeShelf={this.changeShelf}/>
              </div>
            </div>

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp