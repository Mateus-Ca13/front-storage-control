import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.ts'

createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppRoutes />
    </ThemeProvider>,
)
