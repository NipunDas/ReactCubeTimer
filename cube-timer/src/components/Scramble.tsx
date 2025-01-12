import React, { useContext } from 'react'
import { ScrambleContext } from '../providers/ScrambleProvider'
import { EventID, eventNameMap } from '../types/eventTypes'
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
    <>
      <Typography variant='h5'>{scramble}</Typography>
      <Button variant='contained' onClick={fetchScramble}>next</Button>
      <Select value={eventId} onChange={handleSelect}>
        {Object.entries(eventNameMap).map(([eventId, eventName]) => (
          <MenuItem value={eventId} key={eventId}>
            {eventName}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
