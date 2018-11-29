import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SeachView extends Component{
	state = {
		result: [],
		isEmpty: true,
		message: 'Empty search'
	}

	updateQuery = (query) => {
		if(query){
			const result = []
			BooksAPI.search(query).then((books) => {
				books.map(
					book => result.push(book)
				)
				this.setState({result, isEmpty: false})
			}).catch(() => this.setState({result: [], isEmpty: true, message: 'No results found!'}))
		}else{
			this.setState({result: [], isEmpty: true})
		}
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book,shelf)
	}

	render(){
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	            <Link to='/' className='close-search'>Close</Link>
	            	<div className="search-books-input-wrapper">
		                {/*
		                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
		                  You can find these search terms here:
		                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

		                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
		                  you don't find a specific author or title. Every search is limited by search terms.
		                */}
		                <input type="text" 
		                	placeholder="Search by title or author"
							onChange={(event) => this.updateQuery(event.target.value)}/>

	            	</div>
	            </div>
	            <div className="search-books-results">
	            	{!this.state.isEmpty ? (
	            		<ol className="books-grid">{
			              	this.state.result.map((book) => (
			              		<Book book={book}
									key={book.id}
									onChangeShelf={this.changeShelf}/>
			              	))
		              	}</ol>
	              	) : (<div className='empty-result'><p>{this.state.message}</p></div>)}
	            	
	            </div>
        	</div>
        )
	}
}

export default SeachView