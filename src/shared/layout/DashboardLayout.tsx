
import { FullScreenBoxLayout } from '../components/Boxes/Boxes'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import CreateEntryDialog from '../../features/movement/components/CreateEntryDialog/CreateEntryDialog'
import CreateExitDialog from '../../features/movement/components/CreateExitDialog/CreateExitDialog'
import CreateTransferDialog from '../../features/movement/components/CreateTransferDialog/CreateTransferDialog'
import { useTheme } from '@mui/material'

export default function DashboardLayout() {

  const theme = useTheme()
  return (
    <FullScreenBoxLayout>
      <FullScreenBoxLayout component="main" sx={{ flexGrow: 1, p: 4, paddingLeft: 12, backgroundColor: theme.palette.background.default
      }}>
        <CreateEntryDialog/>
        <CreateExitDialog/>
        <CreateTransferDialog/>
        <DashboardSidebar/>
        <Outlet/>
      </FullScreenBoxLayout>
    </FullScreenBoxLayout>
  )
}
