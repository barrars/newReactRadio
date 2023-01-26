import React, { useState, useEffect, useRef } from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
import socket from '../../socket/socket'

export default function Jukebox ({ setSongList, songList }) {
  const roomInput = useRef(null)
  useEffect(() => {
    socket.on('test', (data) => {
      console.log('test', data)
    })
    return () => {
      socket.off('test')
    }
  }, [])

  useEffect(() => {
    socket.on('song', ({ song }) => {
      console.log('song', { song, status })
      console.log('songList', songList)
      setSongList([...songList, song])
    })
    socket.on('click', (data) => {
      console.log('click', data)
    })
    socket.on('eta', (data) => {
      console.log('eta', data)
    })
  }, [socket, songList])
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

  const click = () => {
    console.log(songList)
    // console.log(roomInput.current.value)
    const room = roomInput.current.value
    if (room !== '') {
      console.log('enterRoom!', room)
    }
    // socket.emit('click', { socket: socket.id }, (res) => {
    //   console.log(res)
    // })

    // socket.emit('join-room', `dynamic-${num}`, (res) => {
    //   console.log(res)
    // })
  }
  const roomKeyDown = (e) => {
    if (e.key === 'Enter') {
      const room = roomInput.current.value
      if (room !== '') {
        console.log('enterRoom!', room)
      }
    }
  }
  return (
    <div className='content-center flex  text-center row-span-2'>

      <input type="text"
        onKeyDown={(e) => search(e)}
        className='bg-gray-200 rounded-lg p-2 m-2 w-1/2'
        placeholder={`${downloading ? 'Downloading...' : 'Search for a song'}`}
        disabled={downloading}
      />
      <input onKeyDown={(e) => roomKeyDown(e) } className=' bg-slate-200 m-2 rounded-md' ref={roomInput} type="text" placeholder='enter room' />
      <button className='bg-gray-300 m-2 px-3 rounded-md border border-blue-400 text-lg font-mono' onClick={click}>
        enter
      </button>
      <p className={` h-2 w-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-500'}`}/>
    </div>
  )
}
