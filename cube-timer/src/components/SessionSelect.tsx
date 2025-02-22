import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useContext } from 'react'
import { SessionContext, Session } from '../providers/SessionProvider'

export const SessionSelect: React.FunctionComponent = (): JSX.Element => {
  const {
    sessionList,
    currentIndex,
    setCurrent,
    createSession,
    deleteSession,
  } = useContext(SessionContext)

  const handleSelect = (e: SelectChangeEvent) => {
    switch (e.target.value) {
      case 'new':
        createSession()
        setCurrent(sessionList.length)
        return
      case 'delete':
        deleteSession(currentIndex)
        setCurrent(0)
        return
    }

    const newIndex = Number(e.target.value)
    // this number to string conversion is weird but it works
    // the 'value' prop for Select needs to be a string

    setCurrent(newIndex)
  }

  return (
    <Grid container spacing={2}>
      <Grid textAlign={'right'} size={6}>
        <Typography>Session</Typography>
      </Grid>
      <Grid size={6}>
        <Select value={currentIndex.toString()} onChange={handleSelect}>
          {sessionList.map((session: Session, index: number) => (
            <MenuItem key={index} value={index.toString()}>
              {session.name}
            </MenuItem>
          ))}
          <MenuItem key={-1} value={'new'}>
            New
          </MenuItem>
          {sessionList.length >= 2 ? (
            <MenuItem key={-2} value={'delete'}>
              Delete
            </MenuItem>
          ) : null}
        </Select>
      </Grid>
    </Grid>
  )
}
