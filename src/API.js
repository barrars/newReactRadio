import getSonglist from './helpers/getSongList'

export const loadChats = async (setChats) => {
  // let chats = await fetch('https://chat-radio.com/chatList')
  const chats = await fetch('http://localhost:3001/chatList').then(res => res.json())
    .catch(err => console.info('errrrrr', err))

  // chats = await chats.json()
  // console.info('settting chats', chats)
  setChats(chats)
}

export async function getSongs (setSongList) {
  const songs = await getSonglist()
  console.info('settting songs', songs)
  // console.info('settting songs')
  setSongList(songs)
}
