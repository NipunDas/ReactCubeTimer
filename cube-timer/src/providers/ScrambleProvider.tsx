import React, { useState, useEffect, useCallback, createContext } from 'react'
import { randomScrambleForEvent } from 'cubing/scramble'
import { Alg } from 'cubing/alg'
import { EventID } from '../types/eventTypes'

interface ScrambleContext {
  scramble: string
  fetchScramble: () => void
  eventId: EventID
  setEventId: React.Dispatch<React.SetStateAction<EventID>>
}

export const ScrambleContext: React.Context<ScrambleContext> = createContext({
  scramble: '',
  fetchScramble: () => {},
  eventId: '333' as EventID,
  setEventId: (eventId: React.SetStateAction<EventID>) => {},
})

export const ScrambleProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [scramble, setScramble] = useState<string>('')
  const [eventId, setEventId] = useState<EventID>('333')

  const fetchScramble = useCallback(() => {
    randomScrambleForEvent(eventId).then((alg: Alg) =>
      setScramble(alg.toString())
    )
  }, [eventId, setScramble])

  // every time the event is changed, a new scramble should be fetched
  useEffect(() => fetchScramble(), [eventId])

  return (
    <ScrambleContext.Provider
      value={{ scramble, fetchScramble, eventId, setEventId }}
    >
      {children}
    </ScrambleContext.Provider>
  )
}
