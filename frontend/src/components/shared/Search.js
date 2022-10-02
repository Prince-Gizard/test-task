import React from 'react'
import styled from '@emotion/styled'

import searchImg from '../../images/search.svg'

export default function Search({ value, onChange, placeholder, className }) {
  return (
    <Container className={className}>
      <Input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
      />
      <SearchImg src={searchImg} alt="search" />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 440px;

  background: ${({ theme }) => theme.colors.highlight};
  padding: 7.5px 19px 7.5px 9px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.highlight};
  border-radius: 2em;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.text};
  }
`

const Input = styled.input`
  display: block;
  flex-grow: 1;
  min-width: 0;

  background: transparent;
  padding: 0 10px;
  font-size: 16px;
  font-weight: normal;
  border-width: 0;

  &:focus {
    outline: none;
  }
`

const SearchImg = styled.img`
  width: 19px;
  height: 19px;
`
