export default async function getSongList () {
  try {
    const songList = await fetch(`${process.env.REACT_APP_URL}/songlist`)
    const jsonSongList = await songList.json()

    // console.log('we okay!')
    const undeletedSongs = []
    jsonSongList.forEach(song => {
      return song.deleted
        ? null
        : undeletedSongs.push(song)
    })
    // console.log(undeletedSongs.length, ' songs fetched')

    return undeletedSongs
  } catch (err) {
    console.error({ msg: 'offline?', err })
    return err
  }
}
