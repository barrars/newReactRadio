// import React, { useEffect, useState } from 'react'
// let loadingChats = false
// export default function Chats () {
//   const [chats, setChats] = useState([])
//   // load chats
//   const loadChats = async () => {
//     if (loadingChats) return

//     loadingChats = true
//     let chats = await fetch('https://chat-radio.com/chatList')

//     chats = await chats.json()// objects dont have a lenght property
//     console.log(chats.length)// This is an object
//     console.log(chats)// This is an object
//     setChats(chats)
//   }
//   useEffect(() => {
//     loadChats()
//   }, [])

//   useEffect(() => {
//     document.getElementById('chatWindow').scroll(0, 0)
//   }, [chats])

//   return (
//     <div>
//       {chats.map(chat => <Chat key={chat._id} chat={chat} />)}
//     </div>
//   )
// }

// const Chat = ({ chat }) => {
//   const { name, message, timestamp } = chat
//   return (

//     <div className='flex border-b-2 border-black  ' title={new Date(timestamp).toLocaleString()}>

//       <p className='bg-red-400 pr-3 mb-0'>{name}</p>
//       <p className='bg-green-300 pl-3 mb-0'>{message}</p>

//     </div>)
// }
