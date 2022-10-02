import React from 'react'
import styled from '@emotion/styled'

const getRange = (startIndex, length) => {
  return [...Array(length).keys()].map((i) => i + startIndex)
}

const getPageRange = (current, total, shown) => {
  if (shown > total) {
    return getRange(0, total)
  }

  if (shown === 1) {
    return getRange(current, 1)
  }

  if (shown === 2) {
    if (total - current < 2) {
      return getRange(total - 2, 2)
    }

    return getRange(current, 2)
  }

  if (current === 0) {
    return getRange(0, shown)
  }

  if (total - current + 1 < shown) {
    return getRange(total - shown, shown)
  }
  return getRange(current - 1, shown)
}

export default function Paginator({
  current,
  total,
  shown = 4,
  onChange,
  className,
}) {
  const pageRange = getPageRange(current, total, shown)

  return (
    <Container className={className}>
      <PageButton
        onClick={() => onChange(Math.max(0, current - 1))}
        disabled={current === 0}
      >
        {'<'}
      </PageButton>
      {pageRange.map((pageIndex) => (
        <PageButton
          active={pageIndex === current}
          onClick={() => onChange(pageIndex)}
          key={pageIndex}
        >
          {pageIndex + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onChange(Math.min(total - 1, current + 1))}
        disabled={current === total - 1}
      >
        {'>'}
      </PageButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const PageButton = styled.div`
  width: 45px;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ active, theme }) =>
    active ? theme.colors.highlight : theme.colors.text};
  padding: 10px 0;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  user-select: none;
  filter: ${({ disabled }) => disabled && 'brightness(70%)'};

  &:not(:last-child) {
    margin-right: 10px;
  }
`
