import getSonglist from './helpers/getSongList'

export const loadChats = async (setChats) => {
  console.log(process.env.REACT_APP_API_URL)
  // let chats = await fetch('https://chat-radio.com/chatList')
  const chats = await fetch(`http://${process.env.REACT_APP_URL}/chatList`).then(res => res.json())
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
