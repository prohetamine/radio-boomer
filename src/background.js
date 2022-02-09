import React from 'react'
import styled from 'styled-components'
import backgroundSVG from './assets/images/background.svg'

const Body = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 0px;
  background-image: url(${backgroundSVG});
  background-size: cover;
  background-position: cover;
`

const Background = () => {
  return (
    <Body />
  )
}

export default Background
