import { FullScreenBoxLayout } from '../components/Boxes/Boxes'
import NotFoundedWarning from '../components/NotFoundedWarning/NotFoundedWarning'

export default function NotFoundPage() {


  return (
      <FullScreenBoxLayout component="main" sx={{ p: 4, paddingLeft: 12, backgroundColor: '#f4f6f8' }}>
          <NotFoundedWarning/>
      </FullScreenBoxLayout>
  )
}
