import React, { useContext, useState } from 'react'
import '../css/Timer.css'
import { Scramble } from './Scramble'
import { TimeList } from './timeList/TimeList'
import { TimeDisplay } from './timeInput/TimeDisplay'
import { KeyboardInput } from './timeInput/KeyboardInput'
import Grid from '@mui/material/Grid2'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import { SessionSelect } from './SessionSelect'

export const Timer: React.FunctionComponent = (): JSX.Element => {
  const [isTyping, setIsTyping] = useState<boolean>(false)

  return (
    <Grid container spacing={3}>
      <Grid size={1}>
        <FormControlLabel
          control={
            <Switch
              checked={isTyping}
              onChange={() => setIsTyping(!isTyping)}
            />
          }
          label={'Typing'}
        />
      </Grid>
      <Grid size={11}>
        <Scramble />
      </Grid>
      <Grid size={3}>
        <SessionSelect />
        <TimeList />
      </Grid>
      <Grid size={9}>{isTyping ? <KeyboardInput /> : <TimeDisplay />}</Grid>
    </Grid>
  )
}
