import React from 'react'
import styled from '@emotion/styled'

import { useHistory } from 'react-router-dom'

import UnstyledButton from '../shared/Button'
import Text from '../shared/Text'

import { formatDate } from '../../shared'
import useArticles from '../../hooks/useArticles'

export default function Article({ article, className }) {
  const history = useHistory()

  const { removeArticle } = useArticles()

  const moveToArticlePage = () => {
    history.push(`/articles/${article.id}`, {
      title: article.title,
      date: article.date,
    })
  }

  return (
    <Container className={className} onClick={moveToArticlePage}>
      <div>
        <Title>{article.title}</Title>
        <div>{formatDate(article.date)}</div>
      </div>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          removeArticle(article.id)
        }}
      >
        Удалить
      </Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 3px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const Title = styled(Text)`
  margin-bottom: 10px;
  margin-right: 25px;

  font-size: 20px;
  font-weight: bold;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 25px;
  max-height: 50px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Button = styled(UnstyledButton)`
  background: ${({ theme }) => theme.colors.danger};
  padding: 5px 10px;
  border-width: 0;
`
