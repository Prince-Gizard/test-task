import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import { actions } from '../slices'

const selector = createSelector(
  (state) => state.articles,
  ({ byId, allIds, ...rest }) => ({
    articles: allIds.map((id) => byId[id]),
    ...rest,
  })
)

export default function useArticles() {
  const dispatch = useDispatch()
  const data = useSelector(selector)

  React.useEffect(() => {
    if (data.status === 'idle') {
      dispatch(actions.fetchArticlesRequested())
    }
  }, [dispatch, data.status])

  return {
    ...data,
    addArticle: (article) => dispatch(actions.addArticle({ article })),
    removeArticle: (id) => dispatch(actions.removeArticle({ id })),
  }
}
