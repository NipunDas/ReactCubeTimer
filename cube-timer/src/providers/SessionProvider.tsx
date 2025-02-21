import React, { useState, createContext, useEffect } from 'react'
import { TimeEntry } from '../types/timeTypes'
import { floor } from 'mathjs'
import { EventID } from '../types/eventTypes'

interface SessionContextType {
  sessionList: Session[]
  currentSession: Session
  currentIndex: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  submitTime: (timeInSeconds: number, scramble: string) => void //submitTime, deleteTime, and setEventId can probably be merged
  deleteTime: (index: number) => void
  setEventId: (id: EventID) => void
  createSession: () => void
  deleteSession: (index: number) => void
}

export interface Session {
  name: string
  timeList: TimeEntry[]
  eventId: EventID
}

const initialSessionList = JSON.parse(localStorage.getItem('sessionList') || '[{"name":"1","timeList":[],"eventId":"333"}]')

export const SessionContext: React.Context<SessionContextType> =
  createContext({} as SessionContextType)

export const SessionProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [sessionList, setSessionList] = useState<Session[]>(initialSessionList)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  let currentSession = sessionList[currentIndex]

  useEffect(() => {
    localStorage.setItem('sessionList', JSON.stringify(sessionList))
  }, [sessionList])

  /* Submit a time to the current session */
  const submitTime = (timeInSeconds: number, scramble: string): void => {
    timeInSeconds = floor(timeInSeconds, 2)

    let updatedSession = {
      name: currentSession.name,
      timeList: [...currentSession.timeList, {
        timeInSeconds,
        timestamp: Date.now(),
        scramble,
        comment: ''
      }],
      eventId: currentSession.eventId
    }

    setSessionList([
      ...sessionList.slice(0, currentIndex),
      updatedSession,
      ...sessionList.slice(currentIndex + 1)
    ])
  }

  /* Delete a time from the current session */
  const deleteTime = (index: number): void => {
    let updatedSession = {
      name: currentSession.name,
      timeList: currentSession.timeList.filter((_, i: number) => i !== index),
      eventId: currentSession.eventId
    }

    setSessionList(sessionList.toSpliced(currentIndex, 1, updatedSession))
  }

  /* Changes the current session's event */
  const setEventId = (id: EventID): void => {
    let updatedSession = {
      name: currentSession.name,
      timeList: currentSession.timeList,
      eventId: id
    }

    setSessionList(sessionList.toSpliced(currentIndex, 1, updatedSession))
  }

  // Creates a new session with a default name based on its index
  const createSession = (): void => {
    setSessionList([
      ...sessionList,
      {name: (sessionList.length + 1).toString(), timeList: [], eventId: '333'}
    ])
  }

  const deleteSession = (index: number): void => {
    setSessionList(sessionList.toSpliced(index, 1))
  }

  const context: SessionContextType = {
    sessionList,
    currentSession,
    currentIndex: currentIndex,
    setCurrent: setCurrentIndex,
    submitTime,
    deleteTime,
    setEventId,
    createSession,
    deleteSession
  }

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  )
}
