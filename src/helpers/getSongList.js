
/**
 *
 *
 * @param {LocalForage} myDB
 */
// This is meant to return a song list or a netowrk error
export default async function getSongList () {
  // fetch('http://localhost:3001/songlist')
  try {
    const songList = await fetch('http://localhost:3001/songlist')
    // const songList = await fetch('https://chat-radio.com/songlist')
    const jsonSongList = await songList.json()

    console.log('we okay!')
    const undeletedSongs = []
    jsonSongList.forEach(song => {
      return song.deleted
        ? null
        : undeletedSongs.push(song)
    })
    console.log(undeletedSongs.length, ' songs fetched')

    return undeletedSongs
  } catch (err) {
    console.error({ msg: 'offline?', err })
    return err
  }
}
