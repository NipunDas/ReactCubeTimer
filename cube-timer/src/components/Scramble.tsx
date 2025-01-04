import React, { useContext } from 'react'
import { ScrambleContext } from '../providers/ScrambleProvider'
import { EventID, eventNameMap } from '../types/eventTypes'

export const Scramble: React.FunctionComponent = (): JSX.Element => {
  const { scramble, fetchScramble, eventId, setEventId } =
    useContext(ScrambleContext)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setEventId(e.target.value as EventID)

  return (
    <>
      <h3>{scramble}</h3>
      <button onClick={fetchScramble}>next</button>
      <label>
        Event:
        <select value={eventId} onChange={handleSelect}>
          {Object.entries(eventNameMap).map(([eventId, eventName]) => (
            <option value={eventId} key={eventId}>
              {eventName}
            </option>
          ))}
        </select>
      </label>
    </>
  )
}
