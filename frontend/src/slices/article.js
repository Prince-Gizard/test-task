import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'article',
  initialState: {
    article: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchArticleRequested: (state) => {
      state.status = 'loading'
    },
    fetchArticleSucceeded: (state, { payload }) => {
      const { article } = payload
      state.article = article
      state.status = 'success'
    },
    fetchArticleFailed: (state, { payload }) => {
      const { error } = payload
      state.status = 'error'
      state.error = error
    },
  },
})

export const { actions } = slice
export default slice.reducer
