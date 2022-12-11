import { useState } from 'react'

export default function UseRooms () {
  const [rooms, setRooms] = useState([])
  return { rooms, setRooms }
}
