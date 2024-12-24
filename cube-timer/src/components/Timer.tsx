import React, { useState, useRef, useEffect } from 'react'
import '../css/Timer.css'
import { TimeList } from './TimeList'
import { TimeEntry } from '../types/timeTypes'

export const Timer: React.FunctionComponent = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number>(0)
  const [now, setNow] = useState<number>(0)
  const [timing, setTiming] = useState<boolean>(false) // used to prevent back-to-back triggering of timer
  const [keyDown, setKeyDown] = useState<boolean>(false) // To avoid key press repeats when holding down space, event.repeat is buggy
  const [timeColor, setTimeColor] = useState<string>('black')

  const [timeList, setTimeList] = useState<TimeEntry[]>([])

  const timerInterval = useRef<NodeJS.Timeout>()

  let time: number = 0
  if (startTime != null && now != null) {
    time = (now - startTime) / 1000
  }

  const startTimer = () => {
    setStartTime(Date.now())
    setNow(Date.now())
  }

  const endTimer = () => {
    clearInterval(timerInterval.current)
    setTimeList([
      ...timeList,
      {
        time: time,
        ao5: 0,
        ao12: 0,
        timestamp: now,
      },
    ])
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (keyDown) {
      return
    }

    setKeyDown(true)
    if (timing) {
      endTimer()
    } else if (event.key === ' ') {
      setTimeColor('green')
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === ' ' && !timing) {
      setTiming(true)
      startTimer()
      setTimeColor('black')
    } else if (timing) {
      setTiming(false)
    }
    setKeyDown(false)
  }

  const handleDelete = (index: number) => {
    setTimeList(
      timeList.filter((entry, i: number) => {
        return i !== index
      })
    )
  }

  useEffect(() => {
    /*
    randomScrambleForEvent('333').then((alg: Alg) => {
      console.log(alg)
    })
      */
    // I don't know if this is good in React but hopefully it is
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  useEffect(() => {
    if (timing) {
      timerInterval.current = setInterval(() => {
        setNow(Date.now())
      }, 10)
    }
  }, [timing])

  return (
    <div>
      <div className="timer" style={{ color: timeColor }}>
        {time.toFixed(1)}
      </div>
      <TimeList timeList={timeList} onDelete={handleDelete} />
    </div>
  )
}
