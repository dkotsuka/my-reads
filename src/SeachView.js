import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class SeachView extends Component{
	state = {
		query: '',
		result: [],
		isFetching: false
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() , isFetching: true})
		if(query){
			const result = []
			BooksAPI.search(query).then((books) => {
				books.map(
					book => result.push(book)
				)
				this.setState({result , isFetching: false})
			}).catch(() => this.setState({result: [], isFetching: false}))
		}else{
			this.setState({result: [] , isFetching: false})
		}
	}

	render(){
		const booksInShelf = this.props.booksInShelf
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	            <Link to='/' className='close-search'>Close</Link>
	            	<div className="search-books-input-wrapper">
		                <input type="text" 
		                	placeholder="Search by title or author"
							onChange={(event) => this.updateQuery(event.target.value)}/>

	            	</div>
	            </div>
	            {this.state.isFetching ? 
	            	(<div className='fetching-container'><div className='fetching-spinner'></div></div>) 
	            	: (
			            <div className="search-books-results">
			              	{ !this.state.query ? (<div className='empty-result'><p>Empty search</p></div>) 
			              	: this.state.result.length > 0 ? (
			            		<TransitionGroup className="transition-group books-grid">{
					              	this.state.result.map((b) => {
					              		const book = b
					              		const bookInShelf = booksInShelf.filter((bis) => bis.id === book.id)
					              		let shelf = 'none'
					              		if(bookInShelf[0]){
					              			shelf = bookInShelf[0].shelf
					              		}
					              		book.shelf = shelf
					              		return (
					              			<CSSTransition
								                key={book.id}
								                timeout={500}
								                classNames="fade"
								              >
						              			<Book book={book}
						              			shelfTag={book.shelf}
												onChangeShelf={this.props.changeShelf}/>
											</CSSTransition>
										)
					              	})
				              	}</TransitionGroup>
			              	) : (<div className='empty-result'><p>No results found!</p></div>)}
			            </div>
	            	)}

        	</div>
        )
	}
}

export default SeachView