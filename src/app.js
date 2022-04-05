import React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import Background from './background'
import Main from './main'
import MainFrame from './main-frame'

const Body = styled.div`
  background: #2E2E2E;
  width: 100%;
  height: 100vh;
`

const App = () => {
  const { frame } = queryString.parse(window.location.search)
      , isFrame = !!frame

  return isFrame
            ? (
              <Body>
                <Background />
                <MainFrame />
              </Body>
            )
            : (
              <Body>
                <Background />
                <Main />
              </Body>
            )
}

export default App
