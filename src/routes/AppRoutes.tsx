import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import DashboardLayout from "../shared/layout/DashboardLayout"
import MainDashboard from "../features/dashboard/pages/MainDashboard"
import ProductsPage from "../features/products/pages/ProductsPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function AppRoutes() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to={'/login'}/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route path="" element={<MainDashboard/>} />
                <Route path="products" element={<ProductsPage/>} />
                <Route path="categories" element={<h1>Categories Page</h1>} />
                <Route path="stocks" element={<h1>Stocks Page</h1>} />
                <Route path="movements" element={<h1>Movements Page</h1>} />
                <Route path="cash" element={<h1>Cash Page</h1>} />
                <Route path="users" element={<h1>Users Page</h1>} />
                <Route path="help" element={<h1>Help Page</h1>} />
                <Route path="settings" element={<h1>Settings Page</h1>} />
                <Route path="*" element={<h1>404 - Not Found!</h1>}/>

              
                
            </Route>
            <Route path="*" element={<h1>404 - Not Found!</h1>}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default AppRoutes
