import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { HashRouter } from 'react-router-dom'
import './index.css'

ReactDOM.render(<HashRouter basename={process.env.PUBLIC_URL}><App /></HashRouter>, document.getElementById('root'))
