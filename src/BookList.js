import React from 'react'

function BookList(props) {
	return (
		<div className="bookshelf">
	        <h2 className="bookshelf-title">{props.shelfTitle}</h2>
	        <div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map((book, index) => (
						<li key={book.id}>
			                <div className="book">
								<div className="book-top">
									<div className="book-cover" style={
										{ 
											width: 128, height: 193, 
											backgroundImage: `url(${book.imageLinks.thumbnail})`
										}
									}></div>
									<div className="book-shelf-changer">
										<select value={book.shelf} onChange={(event) => props.onChangeShelf(book, event.target.value)}>
										    <option value="move" disabled>Move to...</option>
										    <option value="currentlyReading">Currently Reading</option>
										    <option value="wantToRead">Want to Read</option>
										    <option value="read">Read</option>
										    <option value="none">Remove</option>
										</select>
									</div>
								</div>
			                	<div className="book-title">{book.title}</div>
			                	<div className="book-authors">{book.authors}</div>
			                </div>
			            </li>
					))}
	            </ol>
			</div>
		</div>
	)
}

export default BookList