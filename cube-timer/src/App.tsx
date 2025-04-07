import React, { useState } from 'react'
import { Timer } from './components/Timer'
import { PBLineChart } from './components/dataVisualization/PBLineChart'
import { ScrambleProvider } from './providers/ScrambleProvider'
import { SessionProvider } from './providers/SessionProvider'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type Page = 'Timer' | 'Data'

const PageRecord: Record<Page, React.ReactNode> = {
  Timer: <Timer />,
  Data: <PBLineChart />,
}

export const App: React.FunctionComponent = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<Page>('Timer')
  const [buttonAnchor, setButtonAnchor] = useState<HTMLElement | null>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonAnchor(event.currentTarget)
  }

  const closeMenu = () => {
    setButtonAnchor(null)
  }

  const switchPage = (page: Page) => {
    setCurrentPage(page)
    closeMenu()
  }

  return (
    <>
      <SessionProvider>
        <ScrambleProvider>
          <Grid size={12}>
            <Button onClick={openMenu}>{currentPage}</Button>
            <Menu
              anchorEl={buttonAnchor}
              open={!!buttonAnchor}
              onClose={closeMenu}
            >
              <MenuItem onClick={() => switchPage('Timer')}>Timer</MenuItem>
              <MenuItem onClick={() => switchPage('Data')}>Data</MenuItem>
            </Menu>
          </Grid>
          {PageRecord[currentPage]}
        </ScrambleProvider>
      </SessionProvider>
    </>
  )
}
