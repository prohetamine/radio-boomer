import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useSocket, useHost } from './socket-provider'
import Player from './player'
import Navigation from './navigation'
import Caset from './caset'
import logoPNG from './assets/images/logo.png'

const procent = window.innerWidth / 100
    , minProcent = 20
    , maxProcent = 30

const castumVW = procent < minProcent
                  ? minProcent
                  : procent > maxProcent
                      ? maxProcent
                      : procent

const Body = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Logo = styled.div`
  width: ${castumVW * (1.4 * 8.2)}px;
  height: ${castumVW * (1.4 * 8.2)}px;
  background-image: url(${logoPNG});
  background-size: cover;
  background-position: cover;
`

const Main = () => {
  const audioRef = useRef()
      , socket = useSocket()
      , host = useHost()

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

  const audioNode = audioRef.current

  useEffect(() => {
    if (socket) {
      socket.on('onUse', async current => {
        setCurrentTrack(oldCurrent => ({
          ...oldCurrent,
          title: current.name,
          id: current.id
        }))

        const fullCurrent = await fetch(`${host}/info?id=${current.id}`).then(d => d.json())

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

      return () => socket.off('onUse')
    }
  }, [socket, host])

  return (
    <Body>
      <Logo />
      <Player track={currentTrack} />
      <Navigation
        isPlay={playerState.isPlay}
        isPause={playerState.isPause}
        isMute={playerState.isMute}
        onPlay={() => {
          if (audioNode) {
            audioNode.play()
            setPlayerState(state => ({
              ...state,
              isPlay: true,
              isPause: false
            }))
          }
        }}
        onPause={() => {
          if (audioNode) {
            audioNode.pause()
            setPlayerState(state => ({
              ...state,
              isPlay: false,
              isPause: true
            }))
          }
        }}
        onMute={(isMute) => {
          if (audioNode) {
            audioNode.muted = isMute
            setPlayerState(state => ({
              ...state,
              isMute
            }))
          }
        }}
        onVolume={(isPlus, isMinus) => {
          if (audioNode) {
            audioNode.volume <= 0.9 && (audioNode.volume += isPlus ? 0.1 : 0)
            audioNode.volume >= 0.1 && (audioNode.volume += isMinus ? -0.1 : 0)
          }
        }}
      />
    <Caset animation={playerState.isPlay ? 'play' : 'pause'} isAlbumImage={currentTrack.isAlbumImage} src={`${host}/picture?id=${currentTrack.id}`} />
      <audio ref={audioRef} hidden disableRemotePlayback={true} x-webkit-airplay='allow' preload='none'>
        <source src={`${host}/radio`} type='audio/webm'></source>
      </audio>
    </Body>
  )
}

export default Main
