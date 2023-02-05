import React, { useEffect } from 'react'
import socket from '../../socket/socket'
// import socket from '../../socketService'

export default function ChatBox ({ setChats, chats, username, chatRoom }) {
  useEffect(() => {
    socket?.on('chat message', (msg) => {
      console.log(`received message via sockets from: ${msg.username}`)
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
      fetch(process.env.REACT_APP_URL + '/chatList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, message, chatRoom })
      })
        .then(res => res.json())
        .then(data => {
          if (data.msg === 'saved') {
            console.log('success')
            return
          }
          console.log(`your msg posted succesfully via post: ${JSON.stringify(data)}`)
        })
      e.target.value = ''
    }
  }
  return (
    <input onKeyDown={(e) => chatHandler(e)} type="text" placeholder='chat here'/>
  )
}
