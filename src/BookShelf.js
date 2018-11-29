import React from 'react'
import Book from './Book'

function BookShelf(props) {
	return (
		<div className="bookshelf">
	        <h2 className="bookshelf-title">{props.shelfTitle} ({props.books.length})</h2>
	        <div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map((book) => (
						<Book book={book}
							key={book.id}
							onChangeShelf={props.onChangeShelf}/>
					))}
	            </ol>
			</div>
		</div>
	)
}

export default BookShelf