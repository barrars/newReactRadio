import getSonglist from './helpers/getSongList'

export const loadChats = async (setChats) => {
  // let chats = await fetch('https://chat-radio.com/chatList')
  try {
    const chats = await fetch(`${process.env.REACT_APP_URL}/chatList`)
    const chatsJSON = await chats.json()
    setChats(chatsJSON)
  } catch (error) {

  }
}

export async function getSongs (setSongList) {
  const songs = await getSonglist()
  console.info('settting songs', songs)
  // console.info('settting songs')
  setSongList(songs)
}
