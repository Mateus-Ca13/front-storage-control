
import { FullScreenBoxLayout } from '../components/Boxes/Boxes'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'

export default function DashboardLayout() {
  return (
    <FullScreenBoxLayout>
      <FullScreenBoxLayout component="main" sx={{ flexGrow: 1, p: 4, paddingLeft: 12, backgroundColor: '#f4f6f8' }}>
        <DashboardSidebar/>
        <Outlet/>
      </FullScreenBoxLayout>
    </FullScreenBoxLayout>
  )
}
