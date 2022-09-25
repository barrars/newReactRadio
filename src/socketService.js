import { io } from 'socket.io-client'

// export const socketService = () => {
// const socket = io('http://localhost:3001')
//   socket.on('connect', () => {
//     console.log('connected')
//     socket.emit('join', `from client ${socket.id}`)
//   })
//   socket.on('songList', (data) => {
//     console.log('songList', data)
//   })
// }

export const socket = io('http://localhost:3001',
  {
    query: {
      name: 'scott'
    }

  })
