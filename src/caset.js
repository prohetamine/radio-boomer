import React from 'react'
import styled from 'styled-components'
import casetSVG from './assets/images/caset.svg'
import casetCircleSVG from './assets/images/caset-circle.svg'

const procent = window.innerWidth / 100
    , minProcent = 14
    , maxProcent = 20

const castumVW = procent < minProcent
                  ? minProcent
                  : procent > maxProcent
                      ? maxProcent
                      : procent

const Body = styled.div`
  margin-top: 20px;
  display: flex;
  width: ${castumVW * (1.4 * 16.1525)}px;
  height: ${castumVW * (1.4 * 10.173)}px;
  position: relative;
  display: flex;
  justify-content: center;
`

const CasetBackground = styled.div`
  width: ${castumVW * (1.4 * 16.1525)}px;
  height: ${castumVW * (1.4 * 10.173)}px;
  background-image: url(${props => props.src});
  background-size: cover;
  position: absolute;
  z-index: 99;
`

const BlurCasetBackground = styled.div`
  width: ${castumVW * (1.4 * 8.934)}px;
  height: ${castumVW * (1.4 * 2.187)}px;
  left: ${castumVW * (1.4 * 3.65)}px;
  top: ${castumVW * (1.4 * 3.25)}px;
  background-image: url(${props => props.src});
  background-size: cover;
  filter: blur(5px);
  border-radius: 37px;
  z-index: 9;
  position: absolute;
`

const Background = styled.div`
  top: ${castumVW * (1.4 * 0.5)}px;
  left: ${castumVW * (1.4 * 0.7)}px;
  width: ${castumVW * (1.4 * 14.55)}px;
  height: ${castumVW * (1.4 * 7.15)}px;
  background-image: url(${props => props.src});
  background-size: cover;
  position: absolute;
  background-color: #fff;
`

const CasetCircle = styled.div`
  width: ${castumVW * (1.4 * 1.9)}px;
  height: ${castumVW * (1.4 * 1.9)}px;
  background-image: url(${casetCircleSVG});
  background-size: cover;
  position: absolute;
  z-index: 100;
  animation: rotate-caset-circle 5s infinite linear;
`

const Caset = ({ src, isAlbumImage }) => {
  return (
    <Body>
      <CasetCircle style={{ left: `${castumVW * (1.4 * 3.65)}px`, top: `${castumVW * (1.4 * 3.4)}px` }} />
      <CasetCircle style={{ left: `${castumVW * (1.4 * 10.55)}px`, top: `${castumVW * (1.4 * 3.4)}px` }} />
      <CasetBackground src={casetSVG} />
      <BlurCasetBackground src={isAlbumImage ? src : ''} />
      <Background src={isAlbumImage ? src : ''} />
    </Body>
  )
}


export default Caset
