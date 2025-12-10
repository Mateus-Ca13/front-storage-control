import { Outlet } from 'react-router-dom'
import Toast from '../../components/Toast/Toast'
import ConfirmActionDialog from '../../components/ConfirmActionDialog/ConfirmActionDialog'
import { useConfirmActionDialogStore } from '../../store/confirmActionDialogStore';

export default function AppUtilityWrapper() {
  const open = useConfirmActionDialogStore(state => state.open);

  return (
    <>
    <Toast/>
    {open && <ConfirmActionDialog/>}
    <Outlet/>
    </>
  )
}
