import React, { useContext } from 'react'
import { ScrambleContext } from '../providers/ScrambleProvider'
import { EventID, eventNameMap } from '../types/eventTypes'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export const Scramble: React.FunctionComponent = (): JSX.Element => {
  const { scramble, fetchScramble, eventId, setEventId } =
    useContext(ScrambleContext)

  const handleSelect = (e: SelectChangeEvent) =>
    setEventId(e.target.value as EventID)

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h5" align="center">
          {scramble}
        </Typography>
      </Grid>
      <Grid size={1}>
        <Button variant="contained" onClick={fetchScramble}>
          next
        </Button>
      </Grid>
      <Grid size={1}>
        <Select value={eventId} onChange={handleSelect}>
          {Object.entries(eventNameMap).map(([eventId, eventName]) => (
            <MenuItem value={eventId} key={eventId}>
              {eventName}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}
