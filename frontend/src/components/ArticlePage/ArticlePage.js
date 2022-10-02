import React from 'react'
import styled from '@emotion/styled'
import { useParams, useLocation } from 'react-router-dom'

import Spinner from '../shared/Spinner'
import UnstyledButton from '../shared/Button'
import ErrorText from '../shared/ErrorText'

import { formatDate } from '../../shared'

import Comments from './Comments'

import useArticle from '../../hooks/useArticle'

export default function ArticlePage() {
  const { id } = useParams()
  const { state } = useLocation()
  const { article, status, error } = useArticle(id)

  const [showComments, setShowComments] = React.useState(false)

  return (
    <Container>
      <Header>
        <Title>{article?.title || state?.title}</Title>
        <DateComponent>
          <div>
            {(article && formatDate(article.date)) ||
              (state && formatDate(state.date))}
          </div>
        </DateComponent>
      </Header>
      <Body>
        {status === 'loading' ? (
          <Spinner />
        ) : status === 'error' ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          article && (
            <>
              <ArticleText>{article.text}</ArticleText>
              <Button onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Скрыть комментарии' : 'Показать комментарии'}
              </Button>
              {showComments && <Comments articleId={id} />}
            </>
          )
        )}
      </Body>
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;
`

const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 30px 60px;
`

const Title = styled.h1`
  margin: 10px 0;

  font-weight: lighter;
  color: ${({ theme }) => theme.colors.textAccent};
  font-size: 30px;
  font-family: ${({ theme }) => theme.fonts.heading};
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`

const DateComponent = styled.div`
  margin: 10px 0;
`

const Body = styled.div`
  height: 100%;
  max-width: 1000px;

  padding: 40px 20px;
`

const ArticleText = styled.p`
  margin-bottom: 60px;

  font-size: 18px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
`

const Button = styled(UnstyledButton)`
  width: 250px;

  margin-bottom: 20px;
`
