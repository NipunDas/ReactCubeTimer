import React, { useState, createContext } from 'react'
import { TimeEntry } from '../types/timeTypes'

interface TimeListContext {
  timeList: TimeEntry[]
  setTimeList: React.Dispatch<React.SetStateAction<TimeEntry[]>>
  submitTime: (timeInSeconds: number, scramble: string) => void
}

// Calculates the average of a list of times
// Excludes the top 5% fastest times, and bottom 5% slowest times (rounded up to nearest whole number)
// if list is length n, then exclude 2 * ceil(5 * 0.05) times
// exception if n <= 2, then we don't have enough times to exclude any
// EX: ao5 excludes the slowest and fastest time (5 * 0.05 = 0.25, round up to 1)
// EX: ao21 excludes 2 slowest and 2 fastest times
// EX: ao100 excludes 5 slowest and 5 fastest times

//TODO: update the timeList to correct averages when times are deleted
function calculateAverage(list: number[]): number {
  if (list.length === 0) {
    return -1;
  }

  list.sort();

  let excludeMargin = list.length <= 2 ? 0 : Math.ceil(list.length * 0.05);
  let counting: number[] = list.slice(excludeMargin, list.length - excludeMargin);

  let sum = 0;
  for (let n of counting) {
    sum += n;
  }

  return sum / counting.length;
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
    //truncate timeInSeconds to 2 digits
    timeInSeconds = Math.floor(timeInSeconds * 100) / 100;

    let ao5: number = -1;
    if (timeList.length >= 4) {
      let last5Times: number[] = timeList.slice(-4).map(entry => entry.timeInSeconds)
      last5Times.push(timeInSeconds);
      ao5 = Number(calculateAverage(last5Times).toFixed(2));
    }

    let ao12: number = -1;
    if (timeList.length >= 11) {
      let last12Times: number[] = timeList.slice(-11).map(entry => entry.timeInSeconds)
      last12Times.push(timeInSeconds);
      ao12 = Number(calculateAverage(last12Times).toFixed(2));
    }

    setTimeList([
      ...timeList,
      {
        timeInSeconds,
        ao5: ao5,
        ao12: ao12,
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
