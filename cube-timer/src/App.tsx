import React from 'react'
import { Timer } from './components/Timer'
import { ScrambleProvider } from './providers/ScrambleProvider'

export const App: React.FunctionComponent = (): JSX.Element => {
  return (
    <>
      <ScrambleProvider>
        <Timer />
      </ScrambleProvider>
    </>
  )
}
