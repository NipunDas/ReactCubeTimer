import React, { useState, useContext, useRef } from 'react'
// import { TimeListContext } from '../../providers/TimeListProvider'
import { SessionContext } from '../../providers/SessionProvider'
import { displayTime } from '../../utils/timeConversion'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'

export interface AverageModalProps {
  startIndex: number
  endIndex: number
  averageInSeconds: number
}

export const AverageModalButton: React.FunctionComponent<AverageModalProps> = ({
  startIndex,
  endIndex,
  averageInSeconds
}: AverageModalProps) => {
  const [open, setOpen] = useState(false)
  const { currentSession } = useContext(SessionContext)
  const timeList = currentSession.timeList
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const timeString = displayTime(averageInSeconds)
  const subList = timeList.slice(startIndex, endIndex)
  const count = subList.length

  const excludeMargin = count <= 2 ? 0 : Math.ceil(count * 0.05)
  const excluded = subList.map((entry, index) => entry.timeInSeconds)
  excluded.sort()
  excluded.splice(excludeMargin, count - 2 * excludeMargin)

  let averageSummary = `Average of ${count}: ${timeString}\n\nTime List:\n`
  subList.forEach((entry, index) => {
    let time = String(entry.timeInSeconds)
    if (excluded.includes(entry.timeInSeconds)) {
      // adding a () around the time if it's in the excluded list
      time = `(${time})`
      excluded.splice(excluded.indexOf(entry.timeInSeconds), 1)
    }

    averageSummary += `${index + 1}. ${time}\t ${entry.scramble}\n`
  })

  const handleClick = () => {
    setOpen(true)
    buttonRef.current?.blur()
  }

  return (
    <>
      <Button variant="text" ref={buttonRef} onClick={handleClick}>
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
            <TextField 
              variant="outlined"
              fullWidth
              multiline
              minRows={20}
              maxRows={20}
              defaultValue={averageSummary}
              slotProps={{
                input: {
                  readOnly: true
                }
              }}
            />
        </Box>
      </Modal>
    </>
  )
}
