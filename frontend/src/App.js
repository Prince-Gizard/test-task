import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import HomePage from './components/HomePage/HomePage'
import ArticlePage from './components/ArticlePage/ArticlePage'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/articles/:id">
            <ArticlePage />
          </Route>
          <Route path="/articles">
            <HomePage />
          </Route>
          <Route path="/">
            <Redirect to="/articles" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
