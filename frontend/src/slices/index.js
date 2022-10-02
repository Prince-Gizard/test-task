import { combineReducers } from 'redux'

import articles, { actions as articlesActions } from './articles.js'
import homePage, { actions as homePageActions } from './homePage.js'
import article, { actions as articleActions } from './article.js'
import comments, { actions as commentsActions } from './comments.js'

export default combineReducers({
  articles,
  homePage,
  article,
  comments,
})

const actions = {
  ...articlesActions,
  ...homePageActions,
  ...articleActions,
  ...commentsActions,
}

export { actions }
