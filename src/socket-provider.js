import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const SocketContext = createContext()

const SocketProvider = ({ baseURL, children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const socket = io(baseURL, {
      transports : ['websocket']
    })

    socket.on('connect_error', () => {
      alert('Я не подключил сервер, ничего не работает...')
      socket.close()
    })

    socket.on('connect', () => setSocket(socket))

    return () => {
      socket.off('connect_error')
      socket.off('connect')
      socket.close()
    }
  }, [setSocket, baseURL])

  return (
    <SocketContext.Provider value={{ socket, baseURL }}>{children}</SocketContext.Provider>
  )
}

const useSocket = () => useContext(SocketContext).socket
const useHost = () => useContext(SocketContext).baseURL

export {
  SocketProvider,
  useSocket,
  useHost
}
