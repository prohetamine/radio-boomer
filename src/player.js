import React from 'react'
import styled from 'styled-components'
import playerSVG from './assets/images/player.svg'
import transliter from './utils/transliter.js'

const procent = window.innerWidth / 100
    , minProcent = 10
    , maxProcent = 20

const castumVW = procent < minProcent
                  ? minProcent
                  : procent > maxProcent
                      ? maxProcent
                      : procent

const Background = styled.div`
  width: ${castumVW * (11 * 3.07)}px;
  height: ${castumVW * 11}px;
  background-image: url(${playerSVG});
  background-size: cover;
  background-position: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'digital';
  font-size: ${castumVW * (1.4 * 2.1)}px;
  color: #66B0A8;
  text-shadow: 0px 0px ${(castumVW * 1.4) / 5}px rgba(82, 82, 82, 0.66);
  filter: brightness(1.5);
`

const Overflow = styled.div`
  overflow: hidden;
  width: ${(castumVW * 1.4) * 22}px;
`

const String = styled.div`
  user-select: none;
  filter: drop-shadow(0px ${(castumVW * 1.4) / 10}px ${(castumVW * 1.4) / 6.6}px #21857A);
  white-space: nowrap;
`

const Symbol = styled.div`
  width: ${castumVW * 1.4}px;
  min-width: ${castumVW * 1.4}px;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align: items: center;
`

const Player = ({ track }) => {
  const text = `${track.title ? transliter(track.title.trim()) : ''}${track.album ? `(${transliter(track.album.trim())})` : ''}${track.artist ? ` - ${transliter(track.artist.trim())}` : ''}`

  return (
    <Background>
      <Overflow>
        <String
          className='steps'
          style={{
            animation: `position-track-string ${parseInt(text.length / 3)}s infinite steps(${text.length}, start)`,
            width: `${text.length * (castumVW * 1.4)}px`,
            minWidth: `${text.length * (castumVW * 1.4)}px`
          }}
        >
        {
          text.split('')
            .map(
              (symbol, key) => (
                <Symbol key={key}>{symbol}</Symbol>
              )
            )
        }
        </String>
      </Overflow>
    </Background>
  )
}

export default Player
