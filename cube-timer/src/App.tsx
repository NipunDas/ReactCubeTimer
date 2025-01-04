import React from 'react'
import { Timer } from './components/Timer'
import { ScrambleProvider } from './providers/ScrambleProvider'
import { TimeListProvider } from './providers/TimeListProvider'

export const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <ScrambleProvider>
        <TimeListProvider>
          <Timer />
        </TimeListProvider>
      </ScrambleProvider>
    </>
  )
}
