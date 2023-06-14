/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chats from './Chats/Chats'
import SongList from './songList/SongList'
import ChatBox from './ChatBox/ChatBox'
import { loadChats, getSongs } from '../API'
import Jukebox from './jukebox/Jukebox'
import { useOnlineStatus } from '../helpers/useOnlineStatus'
import Tabs from './tabs/Tabs'
import { useLocation } from 'react-router-dom'

export default function Main ({ setroomTabs, username, roomTabs, localStorageRoomsArr, setlocalStorageRoomsArr, socket }) {
  // get navigator location
  const pathname = useLocation().pathname.split('/')[1]
  // get roomid from url
  // console.log('pathname', pathname || '/')

  const online = useOnlineStatus()
  const [songList, setSongList] = useState([])
  const [chats, setChats] = useState([])
  // if (roomid === undefined) {
  //   nav('/main')
  // }
  useEffect(() => {
    if (!socket) return
    const id = socket?.id

    if (online && id) {
      console.log(`loading chats and songs for ${pathname} and ${id}`)
      getSongs(setSongList, pathname === undefined ? '/main' : pathname)
      loadChats(setChats, pathname === undefined ? '/main' : pathname, id)
    }
  },
  [online, socket, pathname])
  // [online, roomid, socket, loadChats, getSongs, nav, setRooms, rooms, username, setChats, setSongList, songList, chats])

  useEffect(() => {
    // scrollTo bottom of chat
    document.getElementById('chatList').scrollTo(0, document.getElementById('chatList').scrollHeight)
  }, [chats?.length, online])

  return (
    <div className='h-screen grid grid-rows-[repeat(12,_minmax(0,_1fr))]'>
      <Tabs localStorageRoomsArr={localStorageRoomsArr} setlocalStorageRoomsArr={setlocalStorageRoomsArr} socket={socket} roomTabs={roomTabs} setroomTabs={setroomTabs}/>

      <Jukebox socket={socket} setSongList={setSongList} songList={songList}/>
      <div className='row-[span_10_/_span_10] grid grid-cols-2'>

        <Chats chats={chats}/>

        <div className='col-span-1 bg-slate-200 overflow-x-hidden  '>
          <SongList songList={songList} />
        </div>
      </div>
      <div className='bg-red-400 '>
        <ChatBox socket={socket} setChats={setChats} chats={chats} username={username} localStorageRoomsArr={localStorageRoomsArr}/>
      </div>
    </div>
  )
}
