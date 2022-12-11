import React, { useState, useEffect } from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
import useSocket from '../../hooks/useSocket'
// import socket from '../../socketService'

export default function Jukebox () {
  const socket = useSocket()
  useEffect(() => {
    socket.on('song', (data) => {
      console.log('song', data)
    })
    socket.on('click', (data) => {
      console.log('click', data)
    })
    socket.on('eta', (data) => {
      console.log('eta', data)
    })
  }, [socket])
  const online = useOnlineStatus()
  const [downloading, setDownloading] = useState(false)
  const search = (e) => {
    // console.log('searching', e.target.value)
    if (e.key === 'Enter') {
      const val = e.target.value
      e.target.value = ''
      // setDownloading(true)
      console.log('searching', val)
      fetch(process.env.REACT_APP_URL + '/search?q=' + val.trim())
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setDownloading(false)
        })
    }
  }

  const click = () => {
    // random number 1-10
    const num = Math.floor(Math.random() * 10) + 1
    // console.log('click')
    // socket.emit('click', { socket: socket.id }, (res) => {
    //   console.log(res)
    // })

    socket.emit('join-room', `dynamic-${num}`, (res) => {
      console.log(res)
    })
  }
  return (
    <div className='content-center flex text-center text-4xl row-span-2'>
      <input type="text"
        onKeyDown={(e) => search(e)}
        className='bg-gray-200 rounded-lg p-2 m-2 w-1/2'
        placeholder={`${downloading ? 'Downloading...' : 'Search for a song'}`}
        disabled={downloading}
      />
      <p className=''>
        online {online ? 'true' : 'false'}
      </p>
      <button onClick={click}>
        click me
      </button>
    </div>
  )
}
