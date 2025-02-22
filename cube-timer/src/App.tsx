import React from 'react'
import { Timer } from './components/Timer'
import { ScrambleProvider } from './providers/ScrambleProvider'
import { SessionProvider } from './providers/SessionProvider'

export const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <SessionProvider>
        <ScrambleProvider>
          <Timer />
        </ScrambleProvider>
      </SessionProvider>
    </>
  )
}
