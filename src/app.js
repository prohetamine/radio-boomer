import React from 'react'
import styled from 'styled-components'
import Background from './background'
import Main from './main'

const Body = styled.div`
  background: #2E2E2E;
  width: 100%;
  height: 100vh;
`

const App = () => {
  return (
    <Body>
      <Background />
      <Main />
    </Body>
  )
}

export default App
