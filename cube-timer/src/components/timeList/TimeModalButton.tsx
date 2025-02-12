import React, { useState, useContext } from 'react'
import { TimeListContext } from '../../providers/TimeListProvider'
import { displayTime } from '../../utils/timeConversion'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export interface TimeModalProps {
  index: number
  timeInSeconds: number
  scramble: string
}

export const TimeModalButton: React.FunctionComponent<TimeModalProps> = ({
  index,
  timeInSeconds,
  scramble,
}: TimeModalProps) => {
  const [open, setOpen] = useState(false)
  const { timeList, setTimeList } = useContext(TimeListContext)

  const timeString = displayTime(timeInSeconds)

  const handleDelete = (index: number) => {
    setTimeList(timeList.filter((_entry, i: number) => i !== index))
    setOpen(false)
  }

  return (
    <>
      <Button variant="text" onClick={() => setOpen(true)}>
        {timeString}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Grid container>
            <Grid size={11}>
              <Typography variant="h6">{`Time: ${timeString}`}</Typography>
            </Grid>
            <Grid size={1}>
              <IconButton onClick={() => handleDelete(index)}>
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Grid>
            <Grid size={12}>
              <Typography variant="subtitle1">{`Scramble: ${scramble}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}
