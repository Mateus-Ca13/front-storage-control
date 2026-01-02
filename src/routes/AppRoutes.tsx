import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage"
import DashboardLayout from "../shared/layout/DashboardLayout"
import MainDashboard from "../features/dashboard/pages/MainDashboard"
import ProductsPage from "../features/products/pages/ProductsPage"
import { QueryClientProvider } from "@tanstack/react-query"
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
import { useEffect, useMemo } from "react"
import { useShortcutContextStore } from "../shared/store/keyboardShortcutsStore"
import NotFoundedWarning from "../shared/components/NotFoundedWarning/NotFoundedWarning"
import NotFoundPage from "../shared/pages/NotFoundPage"
import { RouterNavigator } from "../shared/components/RouterNavigator/RouterNavigator"
import SettingsPage from "../features/settings/pages/SettingsPage"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { useSettingsStore } from "../features/settings/stores/SettingsStore"
import { darkTheme } from "../theme/darkTheme"
import { lightTheme } from "../theme/lightTheme"
import HelpPage from "../features/help/pages/HelpPage"
import { queryClient } from "../lib/reactQueryClient"
import { PrivateRoute, PublicRoute } from "./RoutesGuard"

function AppRoutes() {

  const handleKeyDown = useShortcutContextStore(state => state.handleKeyDown);
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const createAppTheme = (mode: 'light' | 'dark') => {
    const selectedPalette = mode === 'light' ? lightTheme : darkTheme;

    return createTheme({
      ...selectedPalette,
    });
  };

  const themeMode = useSettingsStore((state) => state.theme);

   const theme = useMemo(() => {
        return createAppTheme(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterNavigator/>
          <Routes>
            <Route path="/" element={<AppUtilityWrapper/>}>
            <Route element={<PublicRoute/>}>
                <Route path="/" element={<Navigate to={'/login'}/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="*" element={<NotFoundPage/>}/>
              </Route>
              <Route element={<PrivateRoute/>}>
                <Route path="/dashboard" element={<DashboardLayout/>}>
                    <Route path="" element={<MainDashboard/>} />
                    <Route path="products" element={<ProductsPage/>} />
                    <Route path="products/:id" element={<ProductViewPage/>} />
                    <Route path="categories" element={<CategoriesPage/>} />
                    <Route path="categories/:id" element={<CategoryViewPage/>} />n
                    <Route path="stocks" element={<StocksPage/>} />
                    <Route path="stocks/:id" element={<StockViewPage/>} />
                    <Route path="movements" element={<MovementsPage/>} />
                    <Route path="movements/:id" element={<MovementViewPage/>} />
                    <Route path="withdrawal" element={<WithdrawalPage/>} />
                    <Route path="users" element={<UsersPage/>} />
                    <Route path="users/:id" element={<UserViewPage/>} />
                    <Route path="help" element={<HelpPage/>}/>
                    <Route path="settings" element={<SettingsPage/>} />
                    <Route path="*" element={<NotFoundedWarning/>}/>  
                </Route>
              </Route>
                
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default AppRoutes
