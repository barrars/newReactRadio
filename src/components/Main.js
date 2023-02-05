import React, { useEffect, useState } from 'react'
import Chats from './Chats/Chats'
import SongList from './songList/SongList'
import ChatBox from './ChatBox/ChatBox'
import { loadChats, getSongs } from '../API'
import Jukebox from './jukebox/Jukebox'
import { useOnlineStatus } from '../helpers/useOnlineStatus'
// import socket from '../socket/socket'

let loadingChats = false

export default function Main ({ username }) {
  const online = useOnlineStatus()
  const [chatRoom, setchatRoom] = useState('main')
  const [songList, setSongList] = useState([])
  const [chats, setChats] = useState([])

  useEffect(() => {
    // console.log({ online, loadingChats })
    if (!loadingChats && online) {
      loadChats(setChats)
      getSongs(setSongList)
    } else {
      loadingChats = !!online
    }
  }, [online])

  useEffect(() => {
    document.getElementById('chatList').scrollTo(0, document.getElementById('chatList').scrollHeight)
  }, [chats?.length, online])

  return (
    <div className='h-screen grid grid-rows-[repeat(12,_minmax(0,_1fr))]'>

      <Jukebox chatRoom={chatRoom} setchatRoom={setchatRoom} setSongList={setSongList} songList={songList} />
      <div className='row-[span_10_/_span_10] grid grid-cols-2'>
        <Chats chats={chats} username={username} />

        <div className='col-span-1 bg-slate-200 overflow-x-hidden  '>
          <SongList songList={songList} username={username} />
        </div>
      </div>
      <div className='bg-red-400 '>
        <ChatBox chatRoom={chatRoom} setChats={setChats} chats={chats} username={username} />
      </div>
    </div>
  )
}
