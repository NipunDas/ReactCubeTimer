import { TimeEntry } from '../types/timeTypes'

/**
 * Reduces an array of time entries to only include PB times
 */
export const reduceToPBs = (times: TimeEntry[]): TimeEntry[] =>
  times.reduce((acc: TimeEntry[], curr: TimeEntry): TimeEntry[] => {
    const lastPB = acc.at(-1)

    if (lastPB) {
      return curr.timeInSeconds <= lastPB.timeInSeconds ? [...acc, curr] : acc
    } else {
      return [curr]
    }
  }, [])
