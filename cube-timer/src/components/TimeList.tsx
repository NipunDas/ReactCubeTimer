import React, { useContext } from 'react'
import '../css/TimeList.css'
import { TimeListContext } from '../providers/TimeListProvider'

export const TimeList: React.FunctionComponent = (): JSX.Element => {
  const { timeList, setTimeList } = useContext(TimeListContext)

  const handleDelete = (index: number) => {
    setTimeList(timeList.filter((entry, i: number) => i !== index))
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>ao5</th>
          <th>ao12</th>
          <th>Delete</th>
          <th>Scramble</th>
        </tr>
      </thead>
      <tbody>
        {timeList.map((entry, index) => (
          <tr key={entry.timestamp}>
            <td>{index + 1}</td>
            <td>{entry.timeInSeconds.toFixed(2)}</td>
            <td>{entry.ao5 == -1 ? '-' : entry.ao5.toFixed(2)}</td>
            <td>{entry.ao12 == -1 ? '-' : entry.ao12.toFixed(2)}</td>
            <td>
              <button onClick={() => handleDelete(index)}>X</button>
            </td>
            <td>{entry.scramble}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
