import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import DashboardLayout from "../shared/layout/DashboardLayout"

function AppRoutes() {


  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to={'/login'}/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/dashboard" element={<DashboardLayout/>}>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
