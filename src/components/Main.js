import React, { useEffect, useState } from 'react'
import Chats from './Chats/Chats'
import SongList from './songList/SongList'
import ChatBox from './ChatBox/ChatBox'
import { loadChats, getSongs } from '../API'

let loadingChats = false

export default function Main () {
  const [songList, setSongList] = useState([])

  const [chats, setChats] = useState([])

  useEffect(() => {
    if (!loadingChats) {
      loadChats(setChats)
      getSongs(setSongList)
    } else {
      loadingChats = true
    }
  }, [])

  // SCROLL BOTTOM EVERY CHAT UPDATE (effect)
  useEffect(() => {
    document.getElementById('chatList').scrollTo(0, document.getElementById('chatList').scrollHeight)
  }, [chats.length])

  return (
    <div className='h-screen bg-red-300 grid grid-rows-[repeat(12,_minmax(0,_1fr))]'>
      <div className='bg-slate-400 text-4xl text-center'>
        ~~JUKEBOX~~
      </div>
      <div className='row-[span_10_/_span_10] grid grid-cols-2'>
        <div id='chatList' className='col-span-1 bg-slate-300 overflow-x-hidden '>
          <Chats chats={chats} />
        </div>
        <div className='col-span-1 bg-slate-200 overflow-x-hidden  '>
          <SongList songList={songList} />
        </div>
      </div>
      <div className='bg-red-400 '>
        <ChatBox />
      </div>
    </div>
  )
}
