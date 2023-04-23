import React, { useEffect, useState } from 'react'
import Chats from './Chats/Chats'
import SongList from './songList/SongList'
import ChatBox from './ChatBox/ChatBox'
import { loadChats, getSongs } from '../API'
import Jukebox from './jukebox/Jukebox'
import { useOnlineStatus } from '../helpers/useOnlineStatus'
import Tabs from './tabs/Tabs'

let loadingChats = false

export default function Main ({ username }) {
  const online = useOnlineStatus()
  const [songList, setSongList] = useState([])
  const [chats, setChats] = useState([])

  useEffect(() => {
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
  // add a style to the div below

  return (
    <div className='h-screen grid grid-rows-[repeat(12,_minmax(0,_1fr))]'>
      <Tabs />
      <Jukebox setSongList={setSongList} songList={songList} />
      <div className='row-[span_10_/_span_10] grid grid-cols-2'>
        <Chats chats={chats} username={username} />

        <div className='col-span-1 bg-slate-200 overflow-x-hidden  '>
          <SongList songList={songList} username={username} />
        </div>
      </div>
      <div className='bg-red-400 '>
        <ChatBox setChats={setChats} chats={chats} username={username} />
      </div>
    </div>
  )
}
