import React, { useContext } from 'react'
import { SessionContext } from '../../providers/SessionProvider'
import { reduceToPBs } from '../../utils/timeCalculation'
import { LineChart } from '@mui/x-charts/LineChart'
import Typography from '@mui/material/Typography'

export const PBLineChart: React.FunctionComponent = (): JSX.Element => {
  const { currentSession } = useContext(SessionContext)
  const timeList = currentSession.timeList
  const pbTimes = reduceToPBs(timeList)
  const dates = pbTimes.map((timeEntry) => new Date(timeEntry.timestamp))
  const times = pbTimes.map((timeEntry) => timeEntry.timeInSeconds)

  return (
    <>
      <Typography variant="h4" align="center">
        History of Personal Bests
      </Typography>
      <LineChart
        xAxis={[{ data: dates, label: 'Date' }]}
        series={[{ data: times }]}
        width={1000}
        height={600}
      />
    </>
  )
}
