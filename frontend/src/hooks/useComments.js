import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import { actions } from '../slices'

const selector = createSelector(
  (state) => state.comments,
  ({ byId, allIds, ...rest }) => ({
    comments: allIds.map((id) => byId[id]),
    ...rest,
  })
)

export default function useComments(articleId) {
  const dispatch = useDispatch()
  const data = useSelector(selector)

  React.useLayoutEffect(() => {
    if (data.status !== 'success' || data.articleId !== articleId) {
      dispatch(actions.fetchCommentsRequested({ articleId }))
    }
  }, [dispatch, articleId, data.status, data.articleId])

  return {
    ...data,
    addComment: (comment) => dispatch(actions.addComment({ comment })),
  }
}
