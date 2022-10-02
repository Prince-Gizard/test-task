import React from 'react'
import styled from '@emotion/styled'

import Spinner from '../shared/Spinner'
import ErrorText from '../shared/ErrorText'

import Comment from './Comment'
import NewCommentForm from './NewCommentForm'

import useComments from '../../hooks/useComments'

export default function Comments({ articleId, className }) {
  const { comments, status, error } = useComments(articleId)

  return (
    <Container className={className}>
      {status === 'loading' ? (
        <Spinner />
      ) : status === 'error' ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        <>
          <NewCommentForm articleId={articleId} />
          {comments.length === 0 ? (
            <div>Комментарии отсутствуют</div>
          ) : (
            <CommentsWrapper>
              {comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
              ))}
            </CommentsWrapper>
          )}
        </>
      )}
    </Container>
  )
}

const Container = styled.div``

const CommentsWrapper = styled.div``
