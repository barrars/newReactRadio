import { useState, useEffect } from 'react'

function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log('Error reading local storage:', error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log('Error writing to local storage:', error)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
