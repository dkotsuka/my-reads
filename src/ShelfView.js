import React from 'react'
import BookShelf from './BookShelf'

function ShelfView(props) {
	return (
		<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>
                <BookShelf books={props.currentlyReading} 
                  shelfTitle='Currently Reading' 
                  onChangeShelf={props.changeShelf}/>

                <BookShelf books={props.wantToRead} 
                  shelfTitle='Want to Read' 
                  onChangeShelf={props.changeShelf}/>

                <BookShelf books={props.read} 
                  shelfTitle='Read' 
                  onChangeShelf={props.changeShelf}/>
              </div>
            </div>

            <div className="open-search">
              <button onClick={props.onSearchClick}>Add a book</button>
            </div>
        </div>
    )
}

export default ShelfView