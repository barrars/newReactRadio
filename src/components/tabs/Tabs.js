import React from 'react'
import UseRooms from '../../hooks/UseRooms'

export default function Tabs () {
  const { rooms } = UseRooms()
  // if rooms length is greater than 1 return map of rooms
  // else return null
  return (
    <div className=' bg-slate-200'>
      <div className='flex flex-row'>
        {rooms.map((room, isActive) => {
          return (
            <div key={room} className={'rounded-t-2xl py-2 px-4 text-sm font-semibold text-gray-700 border-2 border-gray-300 bg-white'}
          >
            {room}
          </div>
          )
        })}
      </div>
    </div>
  )
}
