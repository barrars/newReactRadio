import React, { useEffect, useRef } from 'react'
import Main from './components/Main'
import { inputName } from './helpers/methods'
import useSocket from './hooks/useSocket'
import useLocalStorage from './hooks/useLocalStorage'
const App = () => {
  const socket = useSocket()
  // console.log({ id: socket?.id, username: socket?.username })

  const [rooms, setRooms] = useLocalStorage('rooms', [{ room: 'main', users: 0, unread: false }])
  // console.log(rooms)
  const [username, setUsername] = useLocalStorage('username', '')

  const inputEl = useRef(null)
  useEffect(() => {
    if (!socket) return
    if (rooms.length === 0) {
      setRooms([{ room: 'main' }])
    }
    // if nav at / root navigate to /main
    if (window.location.pathname === '/') {
      window.location.pathname = '/main'
    }
    rooms.forEach(room => {
      // console.log(room)
      socket.emit('join', room.room, room => {
        console.log(`joined room ${JSON.stringify(room)}`)
      })
    })
    inputEl?.current?.focus()
    if (!username) return
    socket.on('connect', () => {
      // console.log(socket)
      socket.username = username
      socket.emit('join', socket.username, ({ room, count }) => {
        // if doesnt room already exists
        if (room !== '' && !rooms.some(obj => obj.room === room)) {
          // add room to rooms
          setRooms([...rooms, { room, users: count, unread: false }])
          console.log({ room, count })
        }
      })
      // console.log('id = ' + socket.id + ' connected')
    })

    socket.on('joined', ({ room, count }) => {
      console.log('joined', { room, count })
      setRooms([...rooms, { room, users: count, unread: false }])
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
    })
    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('join')
      socket.off('joined')
      console.log('disconnecting')
    }
  }, [username, rooms, setRooms, socket])

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

          <Main username={username} rooms={rooms} setRooms={setRooms} socket={socket} />
        </div>
      )}
    </>
  )
}

export default App
