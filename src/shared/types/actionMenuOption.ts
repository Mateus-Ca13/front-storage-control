export type ActionMenuOption = {
  key: string
  label: string
  icon?: React.ReactNode
  color?: 'primary' | 'common' | 'error' | 'warning' | 'info' | 'success'
  action: (...args: any[]) => any
}