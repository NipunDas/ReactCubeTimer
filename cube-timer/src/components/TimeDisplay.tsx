import React, { useState, useEffect, useRef } from 'react'
import '../css/Timer.css'

interface TimeDisplayProps {
  submitTime: (timeInSeconds: number) => void
}

export const TimeDisplay: React.FunctionComponent<TimeDisplayProps> = ({
  submitTime,
}): JSX.Element => {
  const [startTime, setStartTime] = useState<number>(0)
  const [now, setNow] = useState<number>(0)
  const [timing, setTiming] = useState<boolean>(false) // used to prevent back-to-back triggering of timer
  const [keyDown, setKeyDown] = useState<string>('') // To avoid key press repeats when holding down space (event.repeat is buggy)

  const timerInterval = useRef<NodeJS.Timer>()

  // if key is being held prior to starting timer, make display 0 and make time green
  const aboutToStart = keyDown === ' ' && !timing
  const timeInSeconds = aboutToStart ? 0 : (now - startTime) / 1000.0
  const timeColor = aboutToStart ? 'green' : 'black'

  const startTimer = () => {
    setStartTime(Date.now())
    setNow(Date.now())
    timerInterval.current = setInterval(() => {
      setNow(Date.now())
    }, 10)
  }

  const endTimer = () => {
    setNow(Date.now())
    clearInterval(timerInterval.current)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!keyDown) {
      setKeyDown(event.key)

      if (timing) {
        endTimer()
      } else if (event.key === ' ') {
        setStartTime(Date.now)
      }
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    setKeyDown('')

    if (event.key === ' ' && !timing) {
      setTiming(true)
      startTimer()
    } else if (timing) {
      setTiming(false)
      submitTime(timeInSeconds)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <div className="timer" style={{ color: timeColor }}>
      {timeInSeconds.toFixed(2)}
    </div>
  )
}
