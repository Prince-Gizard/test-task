import axios from 'axios'

// const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// const delayTime = 400

// const maybeThrow = () => {
//   if (Math.random() > 0.5) {
//     throw new Error('some error')
//   }
// }

const getArticles = async () => {
  //await delay(delayTime)
  //maybeThrow()
  const { data } = await axios.get('/api/article')

  return data.data
}

const postArticle = async (articleData) => {
  //await delay(delayTime)
  //maybeThrow()
  const { data } = await axios.post('/api/article', articleData)
  return data
}

const getArticle = async (id) => {
  //await delay(delayTime)
  //maybeThrow()
  const { data } = await axios.get(`/api/article/${id}`)
  return data
}

const getComments = async (articleId) => {
  //await delay(delayTime)
  //maybeThrow()
  const { data } = await axios.get('/api/comment', {
    params: {
      article: articleId,
    },
  })

  return data.records
}

const postComment = async (articleId, commentData) => {
  //await delay(delayTime)
  //maybeThrow()
  const { data } = await axios.post('/api/comment', {
    ...commentData,
    article: articleId,
  })
  return data
}

const api = {
  getArticles,
  postArticle,
  getArticle,
  getComments,
  postComment,
}

export default api
