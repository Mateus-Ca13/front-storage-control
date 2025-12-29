import { Switch, styled } from "@mui/material";

type ThemeSwitchProps = {
  currentTheme: 'light' | 'dark'
}

export const ThemeSwitch = styled(Switch)<ThemeSwitchProps>(({ currentTheme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: currentTheme === 'dark' ? '#073d8fff' : '#dbb610ff',
        opacity: 1
      },
      '& .MuiSwitch-thumb:before': {
        content: '" "',
        position: 'absolute',
        width: '60%',
        height: '60%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url("https://www.svgrepo.com/show/532875/moon.svg")`,
      }
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: currentTheme === 'light' ?  '#eece76ff' : '#bad5ffff',
    width: 32,
    height: 32,
    '&:before': {
      content: '" "',
      position: 'absolute',
      width: '60%',
      height: '60%',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundImage: `url("https://www.svgrepo.com/show/521865/sun.svg")`,
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor: currentTheme === 'dark' ? '#073d8fff' : '#dbb610ff',
    opacity: 1,
  },
}));

