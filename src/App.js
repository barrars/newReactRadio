import React, { useEffect, useRef, useState } from 'react'
import Main from './components/Main'
import { useOnlineStatus } from './helpers/useOnlineStatus'
import { inputName } from './helpers/methods'
import socket from './socket/socket'
// import socket from './socketService'
const App = () => {
  const [username, setUsername] = useState('')
  const online = useOnlineStatus()
  const inputEl = useRef(null)
  useEffect(() => {
    socket.on('connect', (data) => {
      // setUser(socket)
      console.log(socket)
      socket.username = username
      console.log('id = ' + socket.id + ' connected')
      console.log('username = ' + socket.username)
    })
  }, [username])
  useEffect(() => {
    inputEl?.current?.focus()
    if (!username) {
      return
    }
    // socket.connect(username)
    if (username !== '' && online) {
      socket.username = username
      console.log(socket.username)
      console.log(socket.data)
      socket.emit('join', socket.username, (res) => console.log({ res }))
      // socket.on('test', (data) => {
      //   console.log('test', data)
      // })
    }
    socket.on('connect_error', () => {
      console.log('connection error, failed to connect')
      socket.disconnect()
      socket.close()
      socket.removeAllListeners()
    })
    socket.on('disconnect', () => {
      console.log('DISCONNECTED')
    })

    return () => {
      socket.off('connect_error')
      console.log('disconnecting')
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [username, online, socket])

  return (

    <>
      {username === '' &&
        <div className='h-screen  text-center bg-slate-400'>
          <div className=' bg-slate-200 rounded-lg relative top-1/4 border w-2/4  mx-auto px-8 py-4 shadow-2xl'>

          <h1 className='pb-3 '>
            enter a username!
          </h1>
          <input className=' border-2 rounded-md  text-center border-neutral-400 focus:border-red-500' ref={inputEl} type="text" onKeyDown={(e) => inputName(e, setUsername)} placeholder='enter username and hit enter' />
          </div>
        </div>}
      {username !== '' && (
        <div>
          <Main username={username} />
        </div>
      )}
    </>
  )
}

export default App
