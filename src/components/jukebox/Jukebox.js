import React, { useRef } from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
export default function Jukebox () {
  const online = useOnlineStatus()
  const first = useRef(null)
  console.log(first)
  return (
    <div className='content-center grid text-center text-4xl'>
      <input type="text"
      className="border focus:border-red-400 focus-visible:border-red-500" placeholder="search" />
      <p className=''>
        online {online ? 'true' : 'false'}
      </p>
    </div>
  )
}
