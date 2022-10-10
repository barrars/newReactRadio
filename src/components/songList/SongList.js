import React, { useEffect, useState } from 'react'
import Song from './Song'
import { cacheSongHandler, deleteSongHandler } from '../../helpers/cacheSongHandlers'
import { mainStore } from '../../helpers/mainStore'
import { useOnlineStatus } from '../../helpers/useOnlineStatus'
export default function SongList ({ songList, username, socket }) {
  const online = useOnlineStatus()

  const [currentSong, setCurrentSong] = useState('')
  const [cachedSongs, setCachedSongs] = useState('fetching')
  useEffect(() => {
    mainStore.keys().then(keys => {
      console.log('main store ', keys)
      setCachedSongs(keys)
    })
  }, [socket])
  const [playCachedSong, setplayCachedSong] = useState('')
  const produrl = 'http://localhost:3001/'
  // const produrl = 'https://chat-radio.com'

  const songClickHandler = (e) => {
    const song = e.target.innerText
    console.log(song)
    online ? setCurrentSong(song) : playCachedSongHandler(song)
  }

  const playCachedSongHandler = song => {
    console.log(song)
    mainStore.getItem(song)
      .then(data => {
        setplayCachedSong(URL.createObjectURL(data))
        console.log(playCachedSong)
      })
  }

  return (
    <>
      {currentSong && <audio autoPlay controls src={`${produrl}/downloads/${currentSong}`} />}
    {playCachedSong && <audio autoPlay controls src={playCachedSong} />}
      {songList.length > 0 && songList.map((song, i) =>
        <Song key={i} song={song} name={song.fileName} click={songClickHandler} cached={cachedSongs.includes(song.fileName) ? 'Cached' : 'not cachaed'} cacheSongHandler={cacheSongHandler} deleteSongHandler={deleteSongHandler} mainStore={mainStore} setCachedSongs={setCachedSongs} />)
      }
    </>

  )

  // if (songList === 'fetching' || songList === 'done' || cachedSongs === 'fetching') {
  // console.log('STILLLLL LOADDDINGG>>??>>??>??');
  // console.log(songList);
  //     return (
  //         <p>Trying to Fetch Songs.....</p>
  //     )
  // } else if (songList === 'err') {
  //     console.log('offline!!')
  //     // return (
  //     //     <div>
  //     //         {cachedSongs.length > 0 && cachedSongs.map((song, i) => {
  //     //             return (
  //     //                 <div key={i}>
  //     //                     <Song name={song} />
  //     //                     <button onClick={playCachedSongHandler.bind(this, song)}>Play From Cache</button>
  //     //                 </div>
  //     //             )
  //     //         })}
  //     //         {cachedSongs.length === 0 && <p>you didnt save any songs for offline play!</p>}
  //     //         {offlineAudio}
  //     //     </div>
  //     // )
  // }else {
  // console.log('WE SHOULD BE RETURNNING A SONG LIST HEREEEEEE');
  //     return (
  //         <div>
  //             {onlineAudio}
  //             <div>
  //                 {songList.map((song, i) => {
  // console.log(song);
  //                     return song.deleted ? null :
  //                         < div key={song.fileSlug} >
  //                             <Song song={song} name={song.fileName} click={songClickHandler} cached={cachedSongs.includes(song.fileName) ? "Cached" : "not cachaed"} />

  //                             {/* {
  //                                 cachedSongs.includes(song.fileName)
  //                                     ? <button onClick={deleteSongHandler.bind(this, song.fileName, mainStore, setCachedSongs)}>delete from cache</button>
  //                                     : <button onClick={cacheSongHandler.bind(this, song.fileName, mainStore, setCachedSongs)}>save this song</button>
  //                             } */}
  //                         </div>
  //                 })}
  //             </div>
  //         </div >
  //     )
  // }
}
