import React from 'react'
import { socket } from '../../socketService'
export default function Song ({ click, cached, song }) {
  const clack = () => socket.emit('bish', `from client ${socket.id}`)
  return (
    <div className='hover:bg-slate-300 cursor-pointer hover:border-orange-500 border-2'>
      <p onClick={clack}>{song.fileName}</p>
      <p>{cached}</p>
    </div>
  )
}
