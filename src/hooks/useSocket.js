import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const useSocket = (url = process.env.REACT_APP_SOCKET) => {
  const [socket, setSocket] = useState(null)
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = io(url)

    setSocket(socketRef.current)

    return () => {
      socketRef.current.disconnect()
    }
  }, [url])

  return socket
}

export default useSocket
