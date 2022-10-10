import React, { useEffect, useRef, useState } from 'react'
import Main from './components/Main'
import { io } from 'socket.io-client'
import { useOnlineStatus } from './helpers/useOnlineStatus'
import { inputName } from './helpers/methods'

const App = () => {
  let socket = null
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const online = useOnlineStatus()
  const inputEl = useRef(null)
  useEffect(() => {
    console.info({ online, socket })
    inputEl?.current?.focus()
    if (!username) {
      return
    }
    if (!socket) {
      socket = io('http://localhost:3001',
        {
          reconnection: false,
          query: {
            name: username
          }
        })
    }
    socket.username = username
    socket.on('connect', () => {
      setUser(socket)
      console.info(socket.id)
      console.info('connected')
      socket.emit('join', socket.username)
    })
    socket.on('connect_error', () => {
      console.info('connection error, failed to connect')
      socket.disconnect()
      socket.close()
      socket.removeAllListeners()
    })
    socket.on('disconnect', () => {
      console.log('DISCONNECTED')
    })

    return () => {
      socket.off('connect_error')
      console.info('disconnecting')
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [username, online])

  return (

    <>
      {username === '' &&
        <div className='h-screen  text-center bg-slate-400'>
          <div className=' bg-slate-200 relative top-1/4 border w-2/4  mx-auto p-8 shadow-2xl'>

          <h1 className=''>
            enter a username
          </h1>
          <input className='border border-2 border-neutral-600' ref={inputEl} type="text" onKeyDown={(e) => inputName(e, setUsername)} placeholder='enter username and hit enter' />
          </div>
        </div>}
      {username !== '' && (
        <div>
          <Main username={username} socket={user} />
        </div>
      )}

    </>
  )
}

export default App
