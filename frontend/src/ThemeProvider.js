import React from 'react'
import styled from '@emotion/styled'
import {
  Global as GlobalStyles,
  css,
  ThemeProvider as EmotionThemeProvider,
  useTheme,
} from '@emotion/react'

import createPersistedState from 'use-persisted-state'

import light from './themes/light'
import dark from './themes/dark'

const useThemePersisted = createPersistedState('URSIP-test-task-theme')

function GlobalStyler() {
  const theme = useTheme()

  const globalStyles = css`
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    body,
    h1,
    h2,
    h3,
    p,
    ul,
    li {
      margin: 0;
      padding: 0;
    }

    body {
      color: ${theme.colors.text};
      background: ${theme.colors.background};
      font-family: ${theme.fonts.body};
      font-size: 16px;
    }
  `

  return <GlobalStyles styles={globalStyles} />
}

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useThemePersisted(false)

  return (
    <EmotionThemeProvider theme={isDark ? dark : light}>
      <ThemeToggler onClick={() => setIsDark(!isDark)}>
        {isDark ? (
          <>
            <ThemeText>🌞</ThemeText>
            <ThemeBox></ThemeBox>
          </>
        ) : (
          <>
            <ThemeBox></ThemeBox>
            <ThemeText>🌛</ThemeText>
          </>
        )}
      </ThemeToggler>
      <GlobalStyler />
      {children}
    </EmotionThemeProvider>
  )
}

const ThemeToggler = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 0;
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  margin: 5px;
`

const ThemeBox = styled.div`
  background: ${({ theme }) => theme.colors.text};

  padding: 10px;
`

const ThemeText = styled.span`
  margin: 0 3px;
`
