import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { SocketProvider } from './socket-provider.js'

const host = 'http://localhost:8080'

ReactDOM.render(
  <SocketProvider baseURL={host}>
    <App />
  </SocketProvider>,
  document.getElementById('root')
)
