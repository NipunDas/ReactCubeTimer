/**
 * WIP!
 * Current bugs:
 * Times are sometimes overwritten when writing to the time list
 * Timer doesn't turn red when holding down (still turns green and starts correctly)
 */

import React, { useState, useContext, useRef } from 'react'
import { ScrambleContext } from '../../providers/ScrambleProvider'
import { SessionContext } from '../../providers/SessionProvider'
import { displayTime } from '../../utils/timeConversion'
import {
  connectGanTimer,
  GanTimerConnection,
  GanTimerEvent,
  GanTimerState,
} from 'gan-web-bluetooth'
import { Subscription } from 'rxjs'
import Button from '@mui/material/Button'

type TimerColor = 'red' | 'green' | 'black'

export const BluetoothGanTimer: React.FunctionComponent = (): JSX.Element => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0)
  const [timerColor, setTimerColor] = useState<TimerColor>('black')
  const { scramble } = useContext(ScrambleContext)
  const { submitTime } = useContext(SessionContext)
  const subscriptionRef = useRef<Subscription | null>(null)
  const startTimestamp = useRef<number>(0)
  const timerInterval = useRef<NodeJS.Timer>()

  const handleTimerEvent = (timerEvent: GanTimerEvent) => {
    switch (timerEvent.state) {
      case GanTimerState.IDLE:
        console.log('idle')
        setTimeInSeconds(0)
        break
      case GanTimerState.HANDS_ON:
        console.log('hands on')
        setTimerColor('red')
        console.log('red')
        break
      case GanTimerState.HANDS_OFF:
        console.log('hands off')
        setTimerColor('black')
        break
      case GanTimerState.GET_SET:
        console.log('get set')
        // this event is repeated until the user lifts their hands on, so don't want to set state too often
        if (timerColor !== 'green') {
          setTimerColor('green')
        }
        break
      case GanTimerState.RUNNING:
        console.log('running')
        setTimerColor('black')
        startTimestamp.current = Date.now()
        timerInterval.current = setInterval(() => {
          setTimeInSeconds((Date.now() - startTimestamp.current) / 1000.0)
        }, 10)
        break
      case GanTimerState.STOPPED:
        console.log('stopped')
        clearInterval(timerInterval.current)
        const minutes = timerEvent.recordedTime?.minutes ?? 0
        const seconds = timerEvent.recordedTime?.seconds ?? 0
        const milliseconds = timerEvent.recordedTime?.milliseconds ?? 0
        const totalTime = minutes * 60.0 + seconds + milliseconds / 1000.0

        if (totalTime > 0) {
          setTimeInSeconds(totalTime)
          console.log(totalTime)
          submitTime(totalTime, scramble)
        }
        break
      case GanTimerState.DISCONNECT:
        console.log('disconnected')
        setTimeInSeconds(0)
        // unsubscribe from observable
        subscriptionRef.current?.unsubscribe()
        subscriptionRef.current = null
        break
      default:
        console.log(timerEvent.state)
    }
  }

  const connectToTimer = () => {
    connectGanTimer().then((connection: GanTimerConnection) => {
      subscriptionRef.current = connection.events$.subscribe(handleTimerEvent)
    })
  }

  return (
    <>
      <Button onClick={connectToTimer}>Connect</Button>
      <div className="timer" style={{ color: timerColor }}>
        {displayTime(timeInSeconds)}
      </div>
    </>
  )
}
