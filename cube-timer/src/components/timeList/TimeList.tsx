import React, { useContext } from 'react'
import '../../css/TimeList.css'
import { calculateAverage } from '../../providers/TimeListProvider'
import { SessionContext } from '../../providers/SessionProvider'
import { TimeModalButton } from './TimeModalButton'
import { AverageModalButton } from './AverageModalButton'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'

// displays an aoX that ends at a given index in the list, if it is not possible to calculate the average then displays '-'
const displayAverageFromIndex = (
  list: number[],
  index: number,
  x: number
): React.ReactNode => {
  if (index < 0 || index > list.length) {
    return '-'
  }
  if (x > list.length || index - x + 1 < 0) {
    return '-'
  }

  // could probably handle the undefined case better
  let average = calculateAverage(list.slice(index - x + 1, index + 1))
  return average ? (
    <AverageModalButton
      startIndex={index - x + 1}
      endIndex={index + 1}
      averageInSeconds={average}
    />
  ) : (
    '-'
  )
}

export const TimeList: React.FunctionComponent = (): JSX.Element => {
  const { currentSession } = useContext(SessionContext)
  const timeList = currentSession.timeList

  let timeInSecondsList = timeList.map((entry) => entry.timeInSeconds)

  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>ao5</TableCell>
            <TableCell>ao12</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timeList.toReversed().map((entry, index) => (
            <TableRow key={entry.timestamp}>
              <TableCell>{timeList.length - index}</TableCell>
              <TableCell>
                <TimeModalButton
                  timeInSeconds={entry.timeInSeconds}
                  index={timeList.length - index - 1} // since the list is reversed, the real index is length - index - 1
                  scramble={entry.scramble}
                />
              </TableCell>
              <TableCell>
                {displayAverageFromIndex(
                  timeInSecondsList,
                  timeList.length - index - 1,
                  5
                )}
              </TableCell>
              <TableCell>
                {displayAverageFromIndex(
                  timeInSecondsList,
                  timeList.length - index - 1,
                  12
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
