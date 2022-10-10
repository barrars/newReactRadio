import React from 'react'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
export default function Jukebox () {
  const online = useOnlineStatus()
  return (
    <div className='content-center grid text-center text-4xl'>
      <p className=''>
        online {online ? 'true' : 'false'}
      </p>
    </div>
  )
}
