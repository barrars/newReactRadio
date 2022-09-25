import React, { useEffect } from 'react'
import Main from './components/Main'
import { socket } from './socketService'

const App = () => {
  useEffect(() => {
    console.log('connecting to socket')
    socket.emit('join', `from client ${socket.id}`)
    socket.on('connect', () => {
      console.log(socket.id)
      console.log('connected')
    })
  }, [])

  return <Main/>
}

export default App
