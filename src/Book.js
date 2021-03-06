import React from 'react'

function Book(props) {
	const book = props.book
	let shelf = 'none',
		thumbnail = '',
		noCover = ''
	if(book.shelf){
		shelf = book.shelf
	}
	if(book.imageLinks){
		thumbnail = book.imageLinks.thumbnail
	} else {
		noCover = <p className='no-cover-thumbnail'>Image is not available.</p>
	}

	return (						
		<li key={book.id}>
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={
						{ 
							width: 128, height: 193, 
							backgroundImage: `url(${thumbnail})`
						}
					}>{noCover}</div>
					<div className="book-shelf-changer">
						<select value={shelf} 
							onChange={(event) => props.onChangeShelf(book, event.target.value)}>

							<option value="move" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
					<ShelfTag shelfTag={props.shelfTag}/>
				</div>
			    <div className="book-title">{book.title}</div>
			    <div className="book-authors">{book.authors}</div>
			</div>
		</li>
	)
}

function ShelfTag(props) {
	if(!props.shelfTag){
		return ""
	}
	const tags = [
		{name: 'currentlyReading', text:`Currently reading`, className: 'shelf-tag tag-currently-reading'},
		{name: 'wantToRead', text:'Want to read', className: 'shelf-tag tag-want-to-read'},
		{name: 'read', text: 'Read', className: 'shelf-tag tag-already-read'}
	]

	const thisTag = tags.filter((t) => props.shelfTag === t.name)

	return (props.shelfTag !== 'none'? (
		<div className={thisTag[0].className}>
			<small>{thisTag[0].text}</small>
		</div>
	) : "")
}

export default Book