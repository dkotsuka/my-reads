import React from 'react'
import './App.css'
import SeachView from './SeachView'
import ShelfView from './ShelfView'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        this.updateShelves()
    }

    updateShelves() {
        BooksAPI.getAll().then((books) => {
            const newState = this.state
            books.forEach((book) => { newState[book.shelf].push(book) })
            this.setState(newState)
        })
    }

    changeShelf = (book, shelf) => {
        const newState = this.state
        const movingBook = book

        if (book.shelf !== shelf) {
            newState[book.shelf] = newState[book.shelf].filter(b => b.id !== book.id)
            if (shelf !== 'none') {
                movingBook.shelf = shelf
                newState[shelf].push(movingBook)
            }
        }
        this.setState(newState)
        BooksAPI.update(book, shelf)
    }

  render() {
    const shelf = this.state,
          books = [...shelf.currentlyReading, ...shelf.wantToRead, ...shelf.read]
    return (
      <div className="app">

        <Route exact path={'/'} render={({history}) => (
          <ShelfView 
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            changeShelf={this.changeShelf}
            onSearchClick={() => history.push('/search')}
            />
        )}/>

        <Route exact path={'/search'} render={() => (
          <SeachView booksInShelf={books}/>
        )}/>

      </div>
    )
  }
}
export default BooksApp