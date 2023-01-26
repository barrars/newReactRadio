import { io } from 'socket.io-client'

// let socket
// if (localStorage.getItem('access_token')) {
// eslint-disable-next-line prefer-const
export default io(process.env.REACT_APP_SOCKET)

// , {
// transportOptions: {
//   polling: {
//     extraHeaders: {
//       Authorization: `Bearer ${localStorage.getItem(
//         'access_token'
//       )}`
//     }
//   }
// }
// }
// )
// }

// export default socket
