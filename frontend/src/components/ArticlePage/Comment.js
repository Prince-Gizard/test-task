import React from 'react'
import styled from '@emotion/styled'

import Text from '../shared/Text'

export default function Comment({ comment, className }) {
  return (
    <Container className={className}>
      <Username>{comment.user}</Username>
      <Text>{comment.text}</Text>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 10px;

  background: ${({ theme }) => theme.colors.primary};

  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 10px;
`

const Username = styled(Text)`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`
