import React, { useState, useRef } from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
// import socket from '../../socket/socket'
import useSocket from '../../hooks/useSocket'

export default function Jukebox ({ setSongList, songList, chatRooms, setchatRooms }) {
  const roomRef = useRef(null)
  const socket = useSocket()

  // useEffect(() => {
  //   socket.on('song', ({ song }) => {
  //     console.log('song', { song, status })
  //     console.log('songList', songList)
  //     setSongList([...songList, song])
  //   })
  //   socket.on('click', (data) => {
  //     console.log('click', data)
  //   })
  //   socket.on('eta', (data) => {
  //     console.log('eta', data)
  //   })
  // }, [socket, songList])
  const online = useOnlineStatus()
  const [downloading, setDownloading] = useState(false)
  const search = (e) => {
    const socketOBJ = {
      socket: socket.id,
      username: socket.username
    }
    if (e.key === 'Enter') {
      const val = e.target.value
      e.target.value = ''
      // setDownloading(true)
      fetch(process.env.REACT_APP_URL + '/search?q=' + val.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(socketOBJ)
      })
        .then((res) => res.json())
        .then((data) => {
          // const newSong = {
          //   _id: '63cf9015a93d5ea44efd0a95',
          //   title: 'teen spirit',
          //   fileName: 'teen spirit',
          //   plays: 0,
          //   fileSlug: '7fc20360-786a-429a-96d6-19fee42c3788',
          //   createdBy: 'rambo',
          //   downloaded: '2023-01-10T08:34:08.357Z',
          //   deleted: false,
          //   lastPlayed: '2023-01-24T08:00:21.982Z',
          //   __v: 0
          // }
          console.log(data)
          // setSongList([...songList, newSong])
          setDownloading(false)
        })
    }
  }

  const enterRoom = (e) => {
    roomRef.current.value = e.target.value
    console.log(roomRef.current.value)
    if (e.key === 'Enter') {
      const room = roomRef.current.value
      if (room !== '') {
        console.log('emit join-room with data: ', room)
        socket?.emit('joinRoom', room, (room) => {
          console.log(room)
          setchatRooms([...chatRooms, room])
        })
      } else {
        console.log(`room must not be an empty string like '${room}'`)
      }
      // socket.emit('click', { socket: socket.id }, (res) => {
      //   console.log(res)
      // })

    // socket.emit('join-room', `dynamic-${num}`, (res) => {
    //   console.log(res)
    // })
    } else if (e.key === 'Escape') {
      roomRef.current.value = ''
    }
  }
  const btnClick = () => {
    const room = roomRef.current.value
    console.log(roomRef.current.value)
    socket?.emit('joinRoom', room, (room) => {
      console.log(room)
      setchatRooms([...chatRooms, room])
    })
  }
  return (
    <div className='content-center flex  text-center row-span-2'>

      <input type="text"
        onKeyDown={(e) => search(e)}
        className='bg-gray-200 rounded-lg p-2 m-2 w-1/2'
        placeholder={`${downloading ? 'Downloading...' : 'Search for a song'}`}
        disabled={downloading}
      />
      <input ref={roomRef} onKeyDown={(e) => enterRoom(e) } className=' bg-slate-200 m-2 rounded-md' type="text" placeholder='enter room' />
      <button className='bg-gray-300 m-2 px-3 rounded-md border border-blue-400 text-lg font-mono'
        onClick={btnClick}>
        enter
      </button>
      <p className={` h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}/>
    </div>
  )
}
