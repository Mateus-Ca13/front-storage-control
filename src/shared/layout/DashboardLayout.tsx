
import { FullScreenBoxLayout } from '../components/Boxes/Boxes'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../components/DashboardSidebar/DashboardSidebar'

export default function DashboardLayout() {
  return (
    <FullScreenBoxLayout>
      <DashboardSidebar/>
      <Outlet/>
    </FullScreenBoxLayout>
  )
}
