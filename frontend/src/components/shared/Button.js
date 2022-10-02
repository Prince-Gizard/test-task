import React from 'react'
import styled from '@emotion/styled'

function BasicButton({ type = 'button', ...props }) {
  return <button type={type} {...props} />
}

const Button = styled(BasicButton)`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.highlight};
  padding: 0.9em 2em;
  font-size: 16px;
  white-space: nowrap;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 5px;

  &:hover {
    filter: brightness(130%);
  }

  &:disabled,
  &:active {
    filter: brightness(80%);
  }
`

export default Button
