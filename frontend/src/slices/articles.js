import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'

const slice = createSlice({
  name: 'articles',
  initialState: {
    byId: {},
    allIds: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addArticle: (state, { payload }) => {
      const { article } = payload
      state.allIds.unshift(article.id)
      state.byId[article.id] = article
    },
    removeArticle: (state, { payload }) => {
      const { id } = payload
      return {
        ...state,
        allIds: _.without(state.allIds, id),
        byId: _.omit(state.byId, id),
      }
    },
    fetchArticlesRequested: (state) => {
      state.status = 'loading'
    },
    fetchArticlesSucceeded: (state, { payload }) => {
      const { articles } = payload
      state.byId = Object.fromEntries(articles.map((a) => [a.id, a]))
      state.allIds = articles.map((a) => a.id)
      state.status = 'success'
    },
    fetchArticlesFailed: (state, { payload }) => {
      const { error } = payload
      state.status = 'error'
      state.error = error
    },
  },
})

export const { actions } = slice
export default slice.reducer
