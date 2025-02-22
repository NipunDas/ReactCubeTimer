import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react'
import { randomScrambleForEvent } from 'cubing/scramble'
import { Alg } from 'cubing/alg'
import { SessionContext } from './SessionProvider'

interface ScrambleContextType {
  scramble: string
  fetchScramble: () => void
  // eventId: EventID
  // setEventId: React.Dispatch<React.SetStateAction<EventID>>
}

export const ScrambleContext: React.Context<ScrambleContextType> =
  createContext({
    scramble: '',
    fetchScramble: () => {},
    // eventId: '333' as EventID,
    // setEventId: (eventId: React.SetStateAction<EventID>) => {},
  })

export const ScrambleProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [scramble, setScramble] = useState<string>('')
  // const [eventId, setEventId] = useState<EventID>('333')
  const { currentSession } = useContext(SessionContext)
  const eventId = currentSession.eventId

  const fetchScramble = useCallback(() => {
    randomScrambleForEvent(eventId).then((alg: Alg) =>
      setScramble(alg.toString())
    )
  }, [eventId, setScramble])

  /* every time eventId is updated, fetchScramble is also updated, and
    a new eventId means a new scramble should be fetched */
  useEffect(fetchScramble, [fetchScramble])

  return (
    <ScrambleContext.Provider value={{ scramble, fetchScramble }}>
      {children}
    </ScrambleContext.Provider>
  )
}
