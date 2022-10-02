import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actions } from '../slices'

export default function useArticle(id) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.article)

  React.useEffect(() => {
    dispatch(actions.fetchArticleRequested({ id }))
  }, [dispatch, id])

  return {
    ...data,
  }
}
