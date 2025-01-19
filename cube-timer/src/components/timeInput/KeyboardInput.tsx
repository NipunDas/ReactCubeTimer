import React, { useState, useContext } from 'react'
import { ScrambleContext } from '../../providers/ScrambleProvider'
import { TimeListContext } from '../../providers/TimeListProvider'
import { parseTimeString } from '../../utils/timeConversion'
import TextField from '@mui/material/TextField'

export const KeyboardInput: React.FunctionComponent = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('')
  const { scramble, fetchScramble } = useContext(ScrambleContext)
  const { submitTime } = useContext(TimeListContext)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      const time = parseTimeString(inputValue)
      if (time) {
        submitTime(time, scramble)
        fetchScramble()
      }
      setInputValue('')
    }
  }

  return (
    <TextField
      variant="outlined"
      sx={{ width: '75%' }}
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}
