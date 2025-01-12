export interface TimeEntry {
  timeInSeconds: number
  ao5: number | undefined
  ao12: number | undefined
  timestamp: number
  scramble: string
  comment: string
}
