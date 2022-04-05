import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { io } from 'socket.io-client'
import logoPNG from './assets/images/logo-frame.png'
import playSVG from './assets/images/play-frame.svg'
import pauseSVG from './assets/images/pause-frame.svg'
import Player from './player-frame'
import Media from 'react-media'

const Body = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.div`
  width: 100vh;
  height: 100vh;
  background-image: url(${logoPNG});
  background-size: cover;
  background-position: cover;
`

const Button = styled.div`
  width: 50vh;
  height: 50vh;
  margin-left: 25px;
  border: none;
  background: #2E2E2C;
  border-radius: 100px;
  cursor: pointer;
`

const host = 'https://servetamine.ru/'

const Main = () => {
  const audioRef = useRef()

  const [playerState, setPlayerState] = useState({
    isPlay: false,
    isPause: true,
    isMute: false
  })

  const [currentTrack, setCurrentTrack] = useState({
    title: null,
    artist: null,
    album: null,
    id: null,
    isAlbumImage: false
  })

  useEffect(() => {
    const socket = io(host)

    socket.on('connect_error', (err) => {
      console.log(err)
      alert('Не удалось подключиться к серверу')
      socket.close()
    })

    socket.on('connect', () => {
      socket.on('onUse', async current => {
        setCurrentTrack(oldCurrent => ({
          ...oldCurrent,
          title: current.name,
          id: current.id
        }))

        const fullCurrent = await fetch(`${host}info?id=${current.id}`).then(d => d.json())

        if (!fullCurrent.common) {
          setCurrentTrack(oldCurrent => ({
            ...oldCurrent,
            id: current.id,
            title: null,
            artist: null,
            album: null,
            isAlbumImage: false
          }))
          return
        }

        setCurrentTrack(oldCurrent => ({
          ...oldCurrent,
          id: current.id,
          title: fullCurrent.common.title || current.name || null,
          artist: fullCurrent.common.artist || null,
          album: fullCurrent.common.album || null,
          isAlbumImage: fullCurrent.isAlbumImage || false
        }))
      })
    })

    return () => {
      socket.off('connect_error')
      socket.off('connect')
      socket.close()
    }
  }, [])

  const audioNode = audioRef.current

  return (
    <Body>
      <Button
        onClick={
          () => {
            if (audioNode) {
              setPlayerState(state => {
                if (state.isPlay) {
                  audioNode.pause()
                } else {
                  audioNode.play()
                }

                return ({
                  ...state,
                  isPlay: !state.isPlay,
                  isPause: state.isPlay
                })
              })
            }
          }
        }
        style={{
          backgroundImage: `url(${playerState.isPlay ? pauseSVG : playSVG})`,
          backgroundSize: 'cover'
        }}
      />
      <Media
        query='(min-width: 599px)'
        render={() =>
          <Player track={currentTrack} />
        }
      />
      <Logo />
      <audio ref={audioRef} hidden disableRemotePlayback={true} x-webkit-airplay='allow' preload='none'>
        <source src={`${host}radio`} type='audio/webm'></source>
      </audio>
    </Body>
  )
}

export default Main
