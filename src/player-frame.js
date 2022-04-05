import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import playerSVG from './assets/images/player.svg'
import transliter from './utils/transliter.js'

const Background = styled.div`
  width: ${props => props.castumVW * (11 * 3.07)}px;
  height: ${props => props.castumVW * 11}px;
  background-image: url(${playerSVG});
  background-size: cover;
  background-position: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'digital';
  font-size: ${props => props.castumVW * (1.4 * 2.1)}px;
  color: #66B0A8;
  text-shadow: 0px 0px ${props => (props.castumVW * 1.4) / 5}px rgba(82, 82, 82, 0.66);
  filter: brightness(1.5);
`

const Overflow = styled.div`
  overflow: hidden;
  width: ${props => (props.castumVW * 1.4) * 22}px;
`

const String = styled.div`
  user-select: none;
  filter: drop-shadow(0px ${props => (props.castumVW * 1.4) / 10}px ${props => (props.castumVW * 1.4) / 6.6}px #21857A);
  white-space: nowrap;
`

const Symbol = styled.div`
  width: ${props => props.castumVW * 1.4}px;
  min-width: ${props => props.castumVW * 1.4}px;
  overflow: hidden;
  display: inline-flex;
  justify-content: center;
  align: items: center;
`

const useCastumVW = () => {
  const [castumVW, setCastumVW] = useState(window.innerHeight / 15)

  useEffect(() => {
    const handler = () =>
      setCastumVW(window.innerHeight / 15)

    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return castumVW
}


const Player = ({ track }) => {
  const text = `${track.title ? transliter(track.title.trim()) : ''}${track.album ? `(${transliter(track.album.trim())})` : ''}${track.artist ? ` - ${transliter(track.artist.trim())}` : ''}`

  const castumVW = useCastumVW()

  return (
    <Background castumVW={castumVW}>
      <Overflow castumVW={castumVW}>
        <String
          castumVW={castumVW}
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
                <Symbol
                  castumVW={castumVW}
                  key={key}
                >
                  {symbol}
                </Symbol>
              )
            )
        }
        </String>
      </Overflow>
    </Background>
  )
}

export default Player
