import React from 'react'
import '../css/Timer.css'
import { Scramble } from './Scramble'
import { TimeList } from './TimeList'
import { TimeDisplay } from './TimeDisplay'

export const Timer: React.FunctionComponent = (): JSX.Element => (
  <div>
    <Scramble />
    <TimeDisplay />
    <TimeList />
  </div>
)
