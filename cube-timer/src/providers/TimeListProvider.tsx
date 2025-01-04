import React, { useState, createContext } from 'react'
import { TimeEntry } from '../types/timeTypes'

interface TimeListContext {
  timeList: TimeEntry[]
  setTimeList: React.Dispatch<React.SetStateAction<TimeEntry[]>>
  submitTime: (timeInSeconds: number, scramble: string) => void
}

export const TimeListContext: React.Context<TimeListContext> = createContext({
  timeList: [] as TimeEntry[],
  setTimeList: (timeList: React.SetStateAction<TimeEntry[]>) => {},
  submitTime: (timeInSeconds: number, scramble: string) => {},
})

export const TimeListProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
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

  return (
    <TimeListContext.Provider value={{ timeList, setTimeList, submitTime }}>
      {children}
    </TimeListContext.Provider>
  )
}
