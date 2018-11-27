import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import SeachBook from './SearchBook'

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
    BooksAPI.getAll().then((books) => {

      const newState = this.state
      books.map((book) => {newState[book.shelf].push(book)})

      this.setState(newState)
    })
  }

  changeShelf = (book, shelf) => {
    const newState = this.state
    const movingBook = book
    
    if(book.shelf !== shelf){
      newState[book.shelf] = newState[book.shelf].filter(b => b.id !== book.id)

      if(shelf !== 'none'){
        movingBook.shelf = shelf
        newState[shelf].push(movingBook)
      }

    }

    this.setState(newState)
    
    BooksAPI.update(book,shelf)
  }

  loadBooks = () => {

  }

  render() {
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SeachBook/>
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
