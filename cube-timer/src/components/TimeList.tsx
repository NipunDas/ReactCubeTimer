import React, { useContext } from 'react'
import '../css/TimeList.css'
import { TimeListContext, calculateAverage } from '../providers/TimeListProvider'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'

// displays an aoX that ends at a given index in the list, if it is not possible to calculate the average then displays '-'
const displayAverageFromIndex = (
  list: number[],
  index: number,
  x: number
): string => {
  if (index < 0 || index > list.length) {
    return '-'
  }
  if (x > list.length || index - x + 1 < 0) {
    return '-'
  }

  // could probably handle the undefined case better
  let average = calculateAverage(list.slice(index - x + 1, index + 1))
  return average ? average.toFixed(2) : '-'
}

export const TimeList: React.FunctionComponent = (): JSX.Element => {
  const { timeList, setTimeList } = useContext(TimeListContext)
  let timeInSecondsList = timeList.map((entry) => entry.timeInSeconds)

  const handleDelete = (index: number) => {
    setTimeList(timeList.filter((_entry, i: number) => i !== index))
  }


  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>ao5</TableCell>
          <TableCell>ao12</TableCell>
          <TableCell>Delete</TableCell>
          <TableCell>Scramble</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {timeList.map((entry, index) => (
          <TableRow key={entry.timestamp}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{entry.timeInSeconds.toFixed(2)}</TableCell>
            <TableCell>{displayAverageFromIndex(timeInSecondsList, index, 5)}</TableCell>
            <TableCell>{displayAverageFromIndex(timeInSecondsList, index, 12)}</TableCell>
            <TableCell>
              <Button variant='outlined' onClick={() => handleDelete(index)}>X</Button>
            </TableCell>
            <TableCell>{entry.scramble}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
