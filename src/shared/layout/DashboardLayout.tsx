
import { FullScreenBoxLayout } from '../components/Boxes/Boxes'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'
import CreateEntryDialog from '../../features/movement/components/CreateEntryDialog/CreateEntryDialog'
import CreateExitDialog from '../../features/movement/components/CreateExitDialog/CreateExitDialog'
import CreateTransferDialog from '../../features/movement/components/CreateTransferDialog/CreateTransferDialog'

export default function DashboardLayout() {
  return (
    <FullScreenBoxLayout>
      <FullScreenBoxLayout component="main" sx={{ flexGrow: 1, p: 4, paddingLeft: 12, backgroundColor: '#f4f6f8' }}>
        <CreateEntryDialog/>
        <CreateExitDialog/>
        <CreateTransferDialog/>
        <DashboardSidebar/>
        <Outlet/>
      </FullScreenBoxLayout>
    </FullScreenBoxLayout>
  )
}
