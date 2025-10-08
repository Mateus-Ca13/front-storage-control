import { Outlet } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'
import ConfirmActionDialog from '../../components/ConfirmActionDialog/ConfirmActionDialog'

export default function AppUtilityWrapper() {
  return (
    <>
    <Toast/>
    <ConfirmActionDialog/>
    <Outlet/>
    </>
  )
}
