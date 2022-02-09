import React from 'react'
import styled from 'styled-components'
import leftNavBtnSVG from './assets/images/left-nav-btn.svg'
import navBtnSVG from './assets/images/nav-btn.svg'
import rightNavBtnSVG from './assets/images/right-nav-btn.svg'
import leftNavBtnDownSVG from './assets/images/left-nav-btn-down.svg'
import navBtnDownSVG from './assets/images/nav-btn-down.svg'
import rightNavBtnDownSVG from './assets/images/right-nav-btn-down.svg'
import plusSVG from './assets/images/plus.svg'
import minusSVG from './assets/images/minus.svg'
import playSVG from './assets/images/play.svg'
import pauseSVG from './assets/images/pause.svg'

const procent = window.innerWidth / 100
    , minProcent = 8
    , maxProcent = 12

const castumVW = procent < minProcent
                  ? minProcent
                  : procent > maxProcent
                      ? maxProcent
                      : procent

const Body = styled.div`
  margin-top: 20px;
  display: flex;
`

const Wrapper = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 6px;
`

const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: ${castumVW * (1.4 * 0.9)}px;
  line-height: ${castumVW * (1.4 * 0.95)}px;
  text-align: center;
  color: #999999;
  margin-bottom: ${(castumVW * 1.4) / 4}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  width: ${castumVW * (1.4 * 0.7)}px;
  height: ${castumVW * (1.4 * 0.7)}px;
  margin-left: ${castumVW * (1.4 * 0.3)}px;
  background-image: url(${props => props.src});
  background-size: cover;
`

const Button = styled.div`
  width: ${castumVW * (1.4 * 5.55)}px;
  height: ${castumVW * (1.4 * 1.35)}px;
  background-image: url(${props => props.src});
  background-size: cover;
  cursor: pointer;
  &:active {
    background-image: url(${props => props.srcDown});
    background-size: cover;
  }
`

const Navigation = ({
  isPlay,
  isPause,
  isMute,
  onPlay,
  onPause,
  onMute,
  onVolume
}) => {

  return (
    <Body>
      <Wrapper>
        <Title>
          VOLUME
          <Icon src={minusSVG} />
        </Title>
        <Button onClick={() => onVolume(false, true)} src={leftNavBtnSVG} srcDown={leftNavBtnDownSVG} />
      </Wrapper>
      <Wrapper>
        <Title>
          VOLUME
          <Icon src={plusSVG} />
        </Title>
        <Button onClick={() => onVolume(true, false)} src={navBtnSVG} srcDown={navBtnDownSVG} />
      </Wrapper>
      <Wrapper>
        <Title>
          PLAY
          <Icon src={playSVG} />
        </Title>
        <Button onClick={() => onPlay()} src={isPlay ? navBtnDownSVG : navBtnSVG} srcDown={navBtnDownSVG} />
      </Wrapper>
      <Wrapper>
        <Title>
          PAUSE
          <Icon src={pauseSVG} />
        </Title>
        <Button onClick={() => onPause()} src={isPause ? navBtnDownSVG : navBtnSVG} srcDown={navBtnDownSVG} />
      </Wrapper>
      <Wrapper style={{ marginRight: '0px' }}>
        <Title>
          MUTE
          <Icon />
        </Title>
        <Button onClick={() => onMute(!isMute)} src={isMute ? rightNavBtnDownSVG : rightNavBtnSVG} srcDown={rightNavBtnDownSVG}  />
      </Wrapper>
    </Body>
  )
}

export default Navigation
