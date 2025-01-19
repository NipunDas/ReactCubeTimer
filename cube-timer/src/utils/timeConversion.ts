import { fix } from 'mathjs'

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = 3600

/**
 * Converts a numerical time in seconds into a string to be displayed externally.
 * @param timeInSeconds The numerical time to be converted
 * @param numPlaces The number of decimal places in the outputted string (default: 2)
 */
export const displayTime = (
  timeInSeconds: number,
  numPlaces: number = 2
): string => {
  if (timeInSeconds < SECONDS_IN_MINUTE) {
    return fix(timeInSeconds, numPlaces).toFixed(numPlaces)
  } else if (timeInSeconds < SECONDS_IN_HOUR) {
    const minutes = fix(timeInSeconds / SECONDS_IN_MINUTE)
    const seconds = timeInSeconds - minutes * SECONDS_IN_MINUTE
    const secondsString = fix(seconds, numPlaces)
      .toFixed(numPlaces)
      .padStart(3 + numPlaces, '0')
    return `${minutes}:${secondsString}`
  } else {
    const hours = fix(timeInSeconds / SECONDS_IN_HOUR)
    const minutes = fix(
      (timeInSeconds - hours * SECONDS_IN_HOUR) / SECONDS_IN_MINUTE
    )
    const seconds =
      timeInSeconds - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE
    const minutesString = minutes.toString().padStart(2, '0')
    const secondsString = fix(seconds, numPlaces)
      .toFixed(numPlaces)
      .padStart(3 + numPlaces, '0')
    return `${hours}:${minutesString}:${secondsString}`
  }
}
