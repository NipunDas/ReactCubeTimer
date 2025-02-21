import React, { useState, useEffect, useRef, useContext } from 'react'
import { ScrambleContext } from '../../providers/ScrambleProvider'
import { SessionContext } from '../../providers/SessionProvider'
import { displayTime } from '../../utils/timeConversion'
import '../../css/Timer.css'

type TimerState = 'waiting' | 'ready' | 'running' | 'stop'

export const TimeDisplay: React.FunctionComponent = (): JSX.Element => {
  const [startTime, setStartTime] = useState<number>(0)
  const [now, setNow] = useState<number>(0)
  const { scramble, fetchScramble } = useContext(ScrambleContext)
  const { submitTime } = useContext(SessionContext)

  const [timerState, setTimerState] = useState<TimerState>('stop')
  const [spaceDown, setSpaceDown] = useState<boolean>(false)
  //spaceDown is used to avoid keydown event repeats when space is held down (event.repeat is buggy on chrome)
  //https://issues.chromium.org/issues/40940886

  const timerInterval = useRef<NodeJS.Timer>()
  const waitingTimeout = useRef<NodeJS.Timeout>()

  const timeInSeconds = timerState === 'ready' ? 0 : (now - startTime) / 1000.0

  const color = {
    stop: 'black',
    waiting: 'red',
    ready: 'green',
    running: 'black',
  }[timerState]

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
    submitTime(timeInSeconds, scramble)
    fetchScramble()
  }

  // the user must hold space for a period of time in order for the timer to be 'ready'
  // this is handled by the setTimeout function
  // startWaiting begins the Timeout and stores its id to be stopped if needed
  const startWaiting = () => {
    waitingTimeout.current = setTimeout(() => {
      // use a state updater function to get the value of state when the function is called,
      // instead of the value of state during this render
      setTimerState((state) => (state === 'waiting' ? 'ready' : state))
    }, 500)
  }

  const stopWaiting = () => {
    clearTimeout(waitingTimeout.current)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    //event.preventDefault()
    if (!spaceDown && event.key === ' ') {
      setSpaceDown(true)

      // it's important to check multiple conditions when trying to start the timer
      // !spaceDown -> don't trigger on events that fire from space being held, only when its initially pressed
      // event.key === ' ' -> needs to be the space key
      // timerState === stop -> only try to start if the timer isn't running
      if (timerState === 'stop') {
        setTimerState('waiting')
        startWaiting()
      }
    }

    if (timerState === 'running') {
      setTimerState('stop')
      endTimer()
    }
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      setSpaceDown(false)

      if (timerState === 'ready') {
        // timer is ready to begin (have held space long enough)
        setTimerState('running')
        startTimer()
      } else if (timerState === 'waiting') {
        // timer is not ready to begin yet (have not held space long enough)
        setTimerState('stop')
        stopWaiting()
      }
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
    <div className="timer" style={{ color: color }}>
      {displayTime(timeInSeconds)}
    </div>
  )
}
