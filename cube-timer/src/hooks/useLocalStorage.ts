import React, { useState, useEffect } from 'react'

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [val, setVal] = useState<T>(() => {
    const maybeKey = window.localStorage.getItem(key)

    if (maybeKey === null) {
      return defaultValue
    } else {
      return JSON.parse(maybeKey) as T
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val))
  }, [key, val])

  return [val, setVal]
}
