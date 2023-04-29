import React, { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Tabs ({ rooms, setRooms, socket }) {
  const navigate = useNavigate()
  const roomRef = useRef(null)
  const addRoom = (room) => {
    if (room !== '' && !rooms.includes(room)) {
      console.log('emit join-room with data: ', room)
      socket.emit('join', room, (room) => {
        console.log(room)
        roomRef.current.value = ''
        setRooms([...rooms, room])
        navigate(`/${room}`)
      })
    }
  }
  const removeRoom = (room) => {
    console.log('remove room', room)
    setRooms(rooms.filter(r => r !== room))
    navigate('/')
  }
  const joinRoom = (room) => {
    // if room is not in rooms, add it
    if (!rooms.includes(room)) {
      console.log(`join room ${room}`)
      socket.emit('join', room)
    }
  }
  const enterRoom = (e) => {
    if (e.key === 'Enter') {
      addRoom(roomRef.current.value)
    } else if (e.key === 'Escape') {
      roomRef.current.value = ''
    }
  }
  const btnClick = () => {
    addRoom(roomRef.current.value)
  }
  return (
    <div className=' bg-slate-200'>
      <div className='flex flex-row'>
        {rooms?.map((room, i) => {
          return (
            <div key={`${room + i}`} className='relative group '>
              <NavLink onClick={() => joinRoom(room)} to={`/${room}`} className={({ isActive }) => ' rounded-t-2xl py-2 px-4 text-sm font-semibold text-gray-700 border-2 border-gray-300 bg-white' + (isActive ? 'bg-slate-500' : '')}>
                {room}
              </NavLink>
              <i onClick={() => removeRoom(room)} className=' -top-1 right-1 absolute rounded-xl cursor-pointer invisible group-hover:visible '>x</i>
            </div>
          )
        })}
          <input ref={roomRef} onKeyDown={(e) => enterRoom(e)} className=' bg-slate-200 m-2 rounded-md' type="search" placeholder='enter room' />
        <button className='bg-gray-300 m-2 px-3 rounded-md border border-blue-400 text-lg font-mono'
          onClick={btnClick}>
          enter
        </button>
        <div className='items-end justify-end content-end grow'>
          {socket?.username &&
            <p className='text-right text-xs text-gray-500'>
              logged in as {socket.id} {socket.username}</p>}
        </div>

      </div>
    </div>
  )
}
