import React from 'react'
import './App.css'
import SeachView from './SeachView'
import ShelfView from './ShelfView'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">

        <Route exact path='/' render={({history}) => (
          <ShelfView onSearchClick={() => history.push('/search')}/>
        )}/>

        <Route exact path='/search' render={() => (
          <SeachView />
        )}/>

      </div>
    )
  }
}
export default BooksApp