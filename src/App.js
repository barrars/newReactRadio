import React, { useEffect, useRef, useState } from 'react'
import Main from './components/Main'
import { inputName } from './helpers/methods'
import useSocket from './hooks/useSocket'
import useLocalStorage from './hooks/useLocalStorage'
const App = () => {
  const [localStorageRoomsArr, setlocalStorageRoomsArr] = useLocalStorage('rooms', ['main'])
  const [roomTabs, setroomTabs] = useState([{ room: 'main', users: 1 }])
  console.log(`localStorageRoomsArr type is ${typeof (localStorageRoomsArr)}`)
  const [username, setUsername] = useLocalStorage('username', null)
  const [socketConnection, setSocketConnection] = useState('false')
  const [socketId, setSocketId] = useState('')
  const inputEl = useRef(null)
  const socket = useSocket()
  inputEl?.current?.focus()
  useEffect(() => {
    if (!username) return
    socket?.connect()
    console.log(`username is ${username}`)
    if (!socket) return

    // open socket connection

    socket?.on('connect', () => {
      console.log('connected')
      console.log(`socket id ${socket.id}`)
      setSocketId(socket.id)
      setSocketConnection('true')
    })
    // if nav at / root navigate to /main
    if (window.location.pathname === '/') {
      window.location.pathname = '/main'
    }
    socket.username = username
    // if socket set socket.username to username

    localStorageRoomsArr.forEach((room, i) => {
      console.log(`localStorageRoomsArr index ${i} is ${room}`)
      socket.emit('join', '1111', room, (r, c) => {
        console.log(`joined room ${r} from localstorage, count is ${c}`)
        // find the obj in roomTabs array and set count to c
        // const roomTab = roomTabs.findIndex(obj => obj.room === r) >=0 ? roomTabs.findIndex(obj => obj.room === r) : false
        //  const index = roomTab === false ? roomTabs.findIndex(obj => obj.room === 'main') : roomTab
        // console.log(`index is ${i}`)
        // const newRoomTabs = [...roomTabs]

        roomTabs[i] = { room: r, users: c }

        setroomTabs([...roomTabs])
        // setroomTabs([...roomTabs, { room, users: c }])
      })
    })
    // check  rooms array includes username
    if (!localStorageRoomsArr.includes(username)) {
      // if not, join and add it
      socket.emit('join', '2222', username, (room, count) => {
        console.log(`joined room ${room}, count is ${count}`)
        setlocalStorageRoomsArr([...localStorageRoomsArr, username])
        setroomTabs([...roomTabs, { room, users: count }])
      })
    }

    /* keep this */
    // if (!rooms.some(obj => obj.room === username)) {
    //   // if not, join and add it
    //   socket.emit('join', '2222', username, (room, count) => {
    //     console.log(`joined room ${room}, count is ${count}`)
    //     setRooms([...rooms, { room, users: count, unread: false }])
    //   })
    // }

    // socket.emit('join', '3333', username, (room, count) => {
    //   // if doesnt room already exists
    //   if (room !== '' && !rooms.some(obj => obj.room === room)) {
    //     // add room to rooms
    //     setRooms([...rooms, { room, users: count, unread: false }])
    //     console.log('ack from 333')
    //     console.log({ room, count })
    //   }
    // })
    // socket.on('connect', () => {
    // })

    socket.on('joined', ({ room, count, from }) => {
      console.log('socket joined', { room, count, from })
      // increment users in room
      // setroomTabs([...roomTabs, { room, users: count }])
      setroomTabs(roomTabs.map(roomTab => {
        console.log(`roomTab ${JSON.stringify(roomTab)}`)
        if (roomTab.room === room) {
          return { ...roomTab, users: count }
        } else {
          return roomTab
        }
      }))
      // setRooms(rooms.map(obj => {
      //   if (obj.room === room) {
      //     console.log('found room' + JSON.stringify({ ...obj, users: count }))
      //     return { ...obj, users: count }
      //   } else {
      //     return obj
      //   }
      // }))
    })
    socket.on('connect_error', (err) => {
      // console.log('connection error, failed to connect')
      console.log(err)
      // socket.disconnect()
      // socket.close()
      // socket.removeAllListeners()
    })
    socket.on('disconnect', () => {
      console.log('DISCONNECTED')
      setSocketConnection('false')
    })
    return () => {
      socket.off('connect')
      socket.off('connect_error')
      socket.off('join')
      socket.off('joined')
      socket.off('disconnect')
    }
  }, [username, socket])

  // useEffect isConnected

  return (

    <>
      {username === null &&

        <div className='h-screen  text-center bg-slate-400'>
          <div className=' bg-slate-200 rounded-lg relative top-1/4 border w-2/4  mx-auto px-8 py-4 shadow-2xl'>
            <h1 className='pb-3 '>
              enter a username!
            </h1>
            <input className=' border-2 rounded-md  text-center border-neutral-400 focus:border-red-500' ref={inputEl} type="text" onKeyDown={(e) => inputName(e, setUsername)} placeholder='enter username and hit enter' />
          </div>
        </div>}
      {username !== null && (
        <div>
          {/* <Outlet username={username}/> */}
          <p>socket connected?  {socketConnection} id = {socketId}</p>
          <Main setroomTabs={setroomTabs} username={username} roomTabs={roomTabs} localStorageRoomsArr={localStorageRoomsArr} setlocalStorageRoomsArr={setlocalStorageRoomsArr} socket={socket} />
        </div>
      )}
    </>
  )
}

export default App
