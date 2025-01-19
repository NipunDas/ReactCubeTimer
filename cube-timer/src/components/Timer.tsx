import React from 'react'
import '../css/Timer.css'
import { Scramble } from './Scramble'
import { TimeList } from './TimeList'
import { TimeDisplay } from './TimeDisplay'
import Grid from '@mui/material/Grid2'

export const Timer: React.FunctionComponent = (): JSX.Element => (
  <Grid container spacing={2}>
    <Grid size={12}>
      <Scramble />
    </Grid>
    <Grid size={1}>
      <TimeList />
    </Grid>
    <Grid size={11}>
      <TimeDisplay />
    </Grid>
  </Grid>
)
