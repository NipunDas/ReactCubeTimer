import React, { useState, createContext } from 'react'
import { TimeEntry } from '../types/timeTypes'
import { mean, round, fix } from 'mathjs'

interface TimeListContextType {
  timeList: TimeEntry[]
  setTimeList: React.Dispatch<React.SetStateAction<TimeEntry[]>>
  submitTime: (timeInSeconds: number, scramble: string) => void
}

export const TimeListContext: React.Context<TimeListContextType> =
  createContext({
    timeList: [] as TimeEntry[],
    setTimeList: (timeList: React.SetStateAction<TimeEntry[]>) => {},
    submitTime: (timeInSeconds: number, scramble: string) => {},
  })

// Calculates the average of a list of times
// Excludes the top 5% fastest times, and bottom 5% slowest times (rounded up to nearest whole number)
// if list is length n, then exclude 2 * ceil(5 * 0.05) times
// exception if n <= 2, then we don't have enough times to exclude any
// EX: ao5 excludes the slowest and fastest time (5 * 0.05 = 0.25, round up to 1)
// EX: ao21 excludes 2 slowest and 2 fastest times
// EX: ao100 excludes 5 slowest and 5 fastest times

//TODO: update the timeList to correct averages when times are deleted
export const calculateAverage = (
  list: number[],
): number | undefined => {
  if (list.length === 0) {
    return undefined
  }

  list.sort()

  const excludeMargin = list.length <= 2 ? 0 : Math.ceil(list.length * 0.05)
  const counting = list.slice(
    excludeMargin,
    list.length - excludeMargin
  )

  return round(mean(counting), 2) // take mean of counting times, round to 2 decimal places
}

export const TimeListProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [timeList, setTimeList] = useState<TimeEntry[]>([])

  const submitTime = (timeInSeconds: number, scramble: string) => {
    timeInSeconds = fix(timeInSeconds, 2) // truncate time to 2 decimal places

    // // create list of times that includes the time that's about to be submitted
    // const times = timeList.map((entry) => entry.timeInSeconds)
    // times.push(timeInSeconds)

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
