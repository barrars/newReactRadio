import getSonglist from './helpers/getSongList'

export const loadChats = async (setChats) => {
  // let chats = await fetch('https://chat-radio.com/chatList')
  let chats = await fetch('http://localhost:3001/chatList')
  chats = await chats.json()// objects dont have a lenght property
  console.log('settting chats')
  setChats(chats)
}

export async function getSongs (setSongList) {
  const songs = await getSonglist()
  console.log('settting songs')
  setSongList(songs)
}
