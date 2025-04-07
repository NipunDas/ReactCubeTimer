import { floor } from 'mathjs'

const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const SECONDS_IN_HOUR = 3600

/**
 * Converts a numerical time in seconds into a string to be displayed externally.
 * @param timeInSeconds The numerical time to be converted
 * @param numPlaces The number of decimal places in the outputted string (default: 2)
 * @returns A string representing how the time is visually formatted
 */
export const displayTime = (
  timeInSeconds: number,
  numPlaces: number = 2
): string => {
  if (timeInSeconds < SECONDS_IN_MINUTE) {
    return floor(timeInSeconds, numPlaces).toFixed(numPlaces)
  } else if (timeInSeconds < SECONDS_IN_HOUR) {
    const minutes = floor(timeInSeconds / SECONDS_IN_MINUTE)
    const seconds = timeInSeconds - minutes * SECONDS_IN_MINUTE
    const secondsString = floor(seconds, numPlaces)
      .toFixed(numPlaces)
      .padStart(3 + numPlaces, '0')
    return `${minutes}:${secondsString}`
  } else {
    const hours = floor(timeInSeconds / SECONDS_IN_HOUR)
    const minutes = floor(
      (timeInSeconds - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
    )
    const seconds =
      timeInSeconds - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = floor(seconds, numPlaces)
      .toFixed(numPlaces)
      .padStart(3 + numPlaces, '0')
    return `${hours}:${minutesString}:${secondsString}`
  }
}

/**
 * Parses a string input into a numerical time in seconds
 * @param input The string to be parsed into an integer
 * @returns The time in seconds
 */
export const parseTimeString = (input: string): number | undefined => {
  const integerRegex = /^\d+$/
  const floatRegex = /^\d+\.\d*$/
  const minutesRegex = /^\d:\d{2}(\.\d*)?$/
  const hoursRegex = /^\d:\d{2}:\d{2}(\.\d*)?$/

  if (integerRegex.test(input)) {
    if (input.length === 0) {
      return undefined
    } else if (input.length <= 4) {
      return parseInt(input) / 100
    } else if (input.length <= 6) {
      const minutes = parseInt(input.slice(0, -4))
      const seconds = parseInt(input.slice(-4)) / 100

      if (seconds < SECONDS_IN_MINUTE) {
        return minutes * SECONDS_IN_MINUTE + seconds
      } else {
        return undefined
      }
    } else {
      const hours = parseInt(input.slice(0, -6))
      const minutes = parseInt(input.slice(-6, -4))
      const seconds = parseInt(input.slice(-4)) / 100

      if (seconds < SECONDS_IN_MINUTE && minutes < MINUTES_IN_HOUR) {
        return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
      } else {
        return undefined
      }
    }
  } else if (floatRegex.test(input)) {
    return parseFloat(input)
  } else if (minutesRegex.test(input)) {
    // by regex pattern, the string will be split into 2 substrings
    const [minutesString, secondsString] = input.split(':')
    const minutes = parseInt(minutesString)
    const seconds = parseFloat(secondsString)

    if (seconds < SECONDS_IN_MINUTE) {
      return minutes * SECONDS_IN_MINUTE + seconds
    } else {
      return undefined
    }
  } else if (hoursRegex.test(input)) {
    // by regex pattern, the string will be split into 3 substrings
    const [hoursString, minutesString, secondsString] = input.split(':')
    const hours = parseInt(hoursString)
    const minutes = parseInt(minutesString)
    const seconds = parseFloat(secondsString)

    if (seconds < SECONDS_IN_MINUTE && minutes < MINUTES_IN_HOUR) {
      return hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}
