import React from 'react'
export default function Chats (props) {
  const chats = props.chats
  // load chats

  return (
    <div>
      {chats.map(chat => <Chat key={chat._id} chat={chat} />)}
    </div>
  )
}

const Chat = ({ chat }) => {
  const { name, message, timestamp, color } = chat
  // console.log(color)
  return (
    <div className='flex border-b-2 border-black  ' title={new Date(timestamp).toLocaleString()}>

      {/* <p className='bg-red-400 pr-3 mb-0'>{name}</p> */}
      {/* <p className={`bg-[${color}] pr-3 mb-0`}>{name}</p> */}
      <p style={{ background: `${color}` }} className='bg-red-400 pr-3 mb-0'>{name}</p>
      <p className='bg-green-300 pl-3 mb-0'>{message}</p>

    </div>)
}
