import io from 'socket.io-client'

const Events = {}

const Socket = {
  socket: null,
  connect (name) {
    console.log('connecting')
    if (this.socket) return
    // this.socket = io(process.env.REACT_APP_STOCK_DATA_URL);
    this.socket = io(process.env.REACT_APP_SOCKET)
    this.socket.userName = name
  },
  connected: false,
  emit: function (event, data, fn) {
    this.socket.emit(event, data, res => fn(res))
  },
  on: (event, fn) => {
    if (!Events[event]) {
      Events[event] = fn
      Socket.socket.on(event, fn)
    }
  },
  off: (event) => {
    console.log({ event })
    // console.log(typeof Events[event])
    // eslint-disable-next-line no-constant-condition
    if (typeof (Events[event] === 'function')) {
      Events[event] = null
      Socket.socket.off(event)
    }
  }
}

Socket.connect()
// Socket.on('connect', () => console.log('Websocket connected'))

export default Socket

// import { io } from 'socket.io-client'
// const socket = io(`${process.env.REACT_APP_SOCKET}`,
//   {
//     query: {
//       name: 'scott'
//     }
//   })
