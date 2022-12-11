import React, { useEffect } from 'react'
import useSocket from '../../hooks/useSocket'
// import socket from '../../socketService'

export default function ChatBox ({ setChats, chats, username }) {
  const socket = useSocket()
  useEffect(() => {
    socket?.on('chat message', (msg) => {
      console.log(msg)
      setChats([...chats, msg])
    })
    socket?.on('roommsg', (msg) => {
      console.log(msg)
      // console.log('chat message from someone', msg)
      // setChats([...chats, msg])
    // console.log(chats)
    })
    return () => {
      socket?.off('chat message')
      socket?.off('roommsg')
    }
  }, [socket, chats, setChats])

  const chatHandler = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      const message = e.target.value
      socket.emit('chat', message, msg => setChats([...chats, msg])
      )
      e.target.value = ''
    }
  }
  return (
    <input onKeyDown={(e) => chatHandler(e)} type="text" placeholder='chat here'/>
  )
}
