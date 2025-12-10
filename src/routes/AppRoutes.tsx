import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import DashboardLayout from "../shared/layout/DashboardLayout"
import MainDashboard from "../features/dashboard/pages/MainDashboard"
import ProductsPage from "../features/products/pages/ProductsPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StocksPage from "../features/stocks/pages/StocksPage"
import CategoriesPage from "../features/category/pages/CategoriesPage"
import MovementsPage from "../features/movement/pages/MovementsPage"
import UsersPage from "../features/users/pages/UserPage"
import ProductViewPage from "../features/products/pages/ProductViewPage"
import AppUtilityWrapper from "../shared/layout/AppUtilityWrapper/AppUtilityWrapper"
import StockViewPage from "../features/stocks/pages/StockViewPage"
import CategoryViewPage from "../features/category/pages/CategoryViewPage"
import MovementViewPage from "../features/movement/pages/MovementViewPage"
import UserViewPage from "../features/users/pages/UserViewPage"
import WithdrawalPage from "../features/withdrawal/pages/WithdrawalPage"
import { useEffect } from "react"
import { useShortcutContextStore } from "../shared/store/keyboardShortcutsStore"

function AppRoutes() {

  const handleKeyDown = useShortcutContextStore(state => state.handleKeyDown);
  const queryClient = new QueryClient();
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppUtilityWrapper/>}>
              <Route path="/" element={<Navigate to={'/login'}/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/dashboard" element={<DashboardLayout/>}>
                  <Route path="" element={<MainDashboard/>} />
                  <Route path="products" element={<ProductsPage/>} />
                  <Route path="products/:id" element={<ProductViewPage/>} />
                  <Route path="categories" element={<CategoriesPage/>} />
                  <Route path="categories/:id" element={<CategoryViewPage/>} />
                  <Route path="stocks" element={<StocksPage/>} />
                  <Route path="stocks/:id" element={<StockViewPage/>} />
                  <Route path="movements" element={<MovementsPage/>} />
                  <Route path="movements/:id" element={<MovementViewPage/>} />
                  <Route path="withdrawal" element={<WithdrawalPage/>} />
                  <Route path="users" element={<UsersPage/>} />
                  <Route path="users/:id" element={<UserViewPage/>} />
                  <Route path="help" element={<h1>Help Page</h1>} />
                  <Route path="settings" element={<h1>Settings Page</h1>} />
                  <Route path="*" element={<h1>404 - Not Found!</h1>}/>

                
                  
              </Route>
              <Route path="*" element={<h1>404 - Not Found!</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default AppRoutes
