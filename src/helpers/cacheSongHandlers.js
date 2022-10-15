/**
 *
 * @param {String} name
 * @param {LocalForage} myDB
 */

export function cacheSongHandler (name, myDB, cacheState) {
  // console.info(myDB)
  console.info('RUNNING add SONG to cache')
  // fetch(`https://chat-radio.com/downloads/${name}`)
  fetch(`http://${process.env.REACT_APP_URL}/downloads/${name}`)
    .then(response => {
      // response.headers.forEach(console.info);
      // for (const entry of response.headers.entries()) {
      //   console.info(entry)
      // }
      const reader = response.body.getReader()
      return new ReadableStream({
        start (controller) {
          return pump()
          function pump () {
            return reader.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }
              controller.enqueue(value)
              return pump()
            })
          }
        }
      })
    })
    .then(stream => new Response(stream))
    .then(response => {
      response.blob()
        .then(song => {
          myDB.setItem(name, song)
            .then(song => {
              console.info('CACHED ', song)
              myDB.keys()
                .then(keys => cacheState(keys))
            })
        })
    }).catch(err => console.info(err))
}

/**
 *
 * @param {String} name
 * @param {LocalForage} myDB
 */
export function deleteSongHandler (name, myDB, cacheState) {
  console.info('RUNNING remove from cache')

  myDB.removeItem(name)
    .then(() => {
      console.info('hey is cleared')
      myDB.keys().then(keys => {
        cacheState(keys)
      })
    })
}
