import React from 'react'
import Book from './Book'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function BookShelf(props) {
	return (
		<div className="bookshelf">
	        <h2 className="bookshelf-title">{props.shelfTitle} ({props.books.length})</h2>
	        <div className="bookshelf-books">
				<TransitionGroup className="transition-group books-grid">
					{props.books.map((book) => (
						<CSSTransition
			                key={book.id}
			                timeout={500}
			                classNames="fade"
			              >
							<Book book={book}
								onChangeShelf={props.onChangeShelf}/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		</div>
	)
}

export default BookShelf