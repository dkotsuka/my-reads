import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class ShelfView extends Component{
	state = {
		currentlyReading: [],
		wantToRead: [],
		read: []
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
	render(){
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>

	            <div className="list-books-content">
	              <div>
	                <BookShelf books={this.state.currentlyReading} 
	                  shelfTitle='Currently Reading' 
	                  onChangeShelf={this.changeShelf}/>

	                <BookShelf books={this.state.wantToRead} 
	                  shelfTitle='Want to Read' 
	                  onChangeShelf={this.changeShelf}/>

	                <BookShelf books={this.state.read} 
	                  shelfTitle='Read' 
	                  onChangeShelf={this.changeShelf}/>
	              </div>
	            </div>

	            <div className="open-search">
	              <button onClick={this.props.onSearchClick}>Add a book</button>
	            </div>
	        </div>
        )
	}
}

export default ShelfView