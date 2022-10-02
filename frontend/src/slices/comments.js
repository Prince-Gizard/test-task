import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'comments',
  initialState: {
    articleId: null,
    byId: {},
    allIds: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addComment: (state, { payload }) => {
      const { comment } = payload
      state.allIds.unshift(comment.id)
      state.byId[comment.id] = comment
    },
    fetchCommentsRequested: (state) => {
      state.status = 'loading'
    },
    fetchCommentsSucceeded: (state, { payload }) => {
      const { comments, articleId } = payload
      state.byId = Object.fromEntries(comments.map((c) => [c.id, c]))
      state.allIds = comments.map((c) => c.id)
      state.articleId = articleId
      state.status = 'success'
    },
    fetchCommentsFailed: (state, { payload }) => {
      const { error } = payload
      state.status = 'error'
      state.error = error
    },
  },
})

export const { actions } = slice
export default slice.reducer
