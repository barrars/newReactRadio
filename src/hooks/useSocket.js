import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function useSocket () {
  const [socket, setSocket] = useState(io())
  const [isConnected, setIsConnected] = useState(socket?.connected)

  useEffect(() => {
    if (isConnected) {
      console.log('connected')
      // return
    } else {
      setSocket(io(process.env.REACT_APP_SOCKET))
    }
    socket.on('connect', () => {
      setIsConnected(true)
      console.log(isConnected)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])
  return socket
}
