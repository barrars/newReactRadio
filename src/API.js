import getSonglist from './helpers/getSongList'

export async function loadChats (setChats, room, socketID) {
  console.log('getting chats!! ' + room + ' ' + socketID)
  // let chats = await fetch('https://chat-radio.com/chatList')
  // if no socket return
  if (!socketID) return
  console.log('socketIiD', socketID)

  try {
    const chats = await fetch(`${process.env.REACT_APP_URL}/chatList/${room}`)
    // const chats = await fetch(`${process.env.REACT_APP_URL}/chatList/${room}/${socketID}`)
    const chatsJSON = await chats.json()
    setChats(chatsJSON)
  } catch (error) {

  }
}

export async function getSongs (setSongList) {
  const songs = await getSonglist()
  // console.info('settting songs', songs)
  setSongList(songs)
}
