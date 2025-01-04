import React, { useState, useContext } from 'react'
import '../css/Timer.css'
import { Scramble } from './Scramble'
import { TimeList } from './TimeList'
import { TimeDisplay } from './TimeDisplay'
import { TimeEntry } from '../types/timeTypes'

export const Timer: React.FunctionComponent = (): JSX.Element => {
  const [timeList, setTimeList] = useState<TimeEntry[]>([])

  const submitTime = (timeInSeconds: number, scramble: string) => {
    setTimeList([
      ...timeList,
      {
        timeInSeconds,
        ao5: 0,
        ao12: 0,
        timestamp: Date.now(),
        scramble,
        comment: '',
      },
    ])
  }

  const handleDelete = (index: number) => {
    setTimeList(
      timeList.filter((entry, i: number) => {
        return i !== index
      })
    )
  }

  return (
    <div>
      <Scramble />
      <TimeDisplay submitTime={submitTime} />
      <TimeList timeList={timeList} onDelete={handleDelete} />
    </div>
  )
}
