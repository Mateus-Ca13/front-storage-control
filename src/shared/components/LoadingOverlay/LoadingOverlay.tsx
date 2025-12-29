import { CenterFlexBox } from '../Boxes/Boxes'
import { CircularProgress } from '@mui/material'

export default function LoadingOverlay() {
  return (
    <CenterFlexBox sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', zIndex: 10}}>
         <CircularProgress />
    </CenterFlexBox>
  )
}
