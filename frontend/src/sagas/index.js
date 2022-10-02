import { call, put, takeLatest, all } from 'redux-saga/effects'

import api from '../api'
import { actions } from '../slices'

function* fetchArticles() {
  try {
    const articles = yield call(api.getArticles)
    yield put(actions.fetchArticlesSucceeded({ articles }))
  } catch (e) {
    yield put(actions.fetchArticlesFailed({ error: e.message }))
  }
}

function* fetchArticle({ payload }) {
  const { id } = payload
  try {
    const article = yield call(api.getArticle, id)
    yield put(actions.fetchArticleSucceeded({ article }))
  } catch (e) {
    yield put(actions.fetchArticleFailed({ error: e.message }))
  }
}

function* fetchComments({ payload }) {
  const { articleId } = payload
  try {
    const comments = yield call(api.getComments, articleId)
    yield put(actions.fetchCommentsSucceeded({ comments, articleId }))
  } catch (e) {
    yield put(actions.fetchCommentsFailed({ error: e.message }))
  }
}

function* watchFetchArticles() {
  yield takeLatest(actions.fetchArticlesRequested, fetchArticles)
}

function* watchFetchArticle() {
  yield takeLatest(actions.fetchArticleRequested, fetchArticle)
}

function* watchFetchComments() {
  yield takeLatest(actions.fetchCommentsRequested, fetchComments)
}

export default function* rootSaga() {
  yield all([watchFetchArticles(), watchFetchArticle(), watchFetchComments()])
}
