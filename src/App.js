import React, { useEffect, useRef } from 'react'
import Main from './components/Main'
import { inputName } from './helpers/methods'
import useSocket from './hooks/useSocket'
import useLocalStorage from './hooks/useLocalStorage'
const App = () => {
  const socket = useSocket()
  // console.log({ id: socket?.id, username: socket?.username })

  const [rooms, setRooms] = useLocalStorage('rooms', ['main'])
  // console.log(rooms)
  const [username, setUsername] = useLocalStorage('username', '')

  const inputEl = useRef(null)
  useEffect(() => {
    // console.log(socket)
    if (!socket) return
    if (rooms.length === 0) {
      setRooms(['main'])
    }
    // if nav at / root navigate to /main
    if (window.location.pathname === '/') {
      window.location.pathname = '/main'
    }
    rooms.forEach(room => {
      // console.log(room)
      socket.emit('join', room, (room) => {
        // console.log(`joined room ${room}`)
      })
    })
    inputEl?.current?.focus()
    if (!username) return
    socket.on('connect', () => {
      // console.log(socket)
      socket.username = username
      socket.emit('join', socket.username, res => {
        // console.log({ res })
      })
      // console.log('id = ' + socket.id + ' connected')
    })
    socket.on('welcome', (msg) => {
      // console.log('welcome message from server')

      // console.log(msg)
    })
    socket.on('connect_error', (err) => {
      // console.log('connection error, failed to connect')
      console.log(err)
      socket.disconnect()
      socket.close()
      socket.removeAllListeners()
    })
    socket.on('disconnect', () => {
      // console.log('DISCONNECTED')
    }
    )
    return () => {
      socket.off('connect_error')
      socket.off('join')
      console.log('disconnecting')
      socket.off('connect!')
    }
  }, [username, socket, setRooms, rooms])

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
          {/* <Outlet username={username}/> */}

          <Main username={username} rooms={rooms} setRooms={setRooms} socket={socket}/>
        </div>
      )}
    </>
  )
}

export default App
