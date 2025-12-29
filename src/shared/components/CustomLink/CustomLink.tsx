import { useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

type CustomLinkProps = {
    children: React.ReactNode
    to: string
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
    textDecoration?: boolean
}


export default function CustomLink({ children, to, color = 'primary', textDecoration = true }: CustomLinkProps) {
    const theme = useTheme()
  return (
    <Link to={to} style={{textDecoration: textDecoration ? 'underline' : 'none', color: theme.palette[color].main, fontWeight: 500}}>{children}</Link>
)
}
