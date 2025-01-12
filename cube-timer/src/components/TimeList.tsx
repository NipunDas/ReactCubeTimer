import React, { useContext } from 'react'
import '../css/TimeList.css'
import { TimeListContext } from '../providers/TimeListProvider'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Button from '@mui/material/Button'

export const TimeList: React.FunctionComponent = (): JSX.Element => {
  const { timeList, setTimeList } = useContext(TimeListContext)

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
            <TableCell>{entry.ao5 ? entry.ao5.toFixed(2) : '-'}</TableCell>
            <TableCell>{entry.ao12 ? entry.ao12.toFixed(2) : '-'}</TableCell>
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
