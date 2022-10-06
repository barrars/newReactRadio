import React from 'react'
import { socket } from '../../socketService'

export default function ChatBox ({ setChats, chats }) {
  socket.on('chat message', (msg) => {
    console.log(chats)
    console.log('chat message from someone', msg)
    setChats([...chats, msg])
    console.log(chats)
  })

  const chatHandler = (e) => {
    if (e.key === 'Enter') {
      const message = e.target.value
      socket.emit('chat', message)
      e.target.value = ''
    }
  }
  return (
    <input onKeyDown={(e) => chatHandler(e)} type="text" placeholder='chat here'/>
  )
}
