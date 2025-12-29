import { Switch } from "@mui/material"
import { styled } from "@mui/system"

type TwoColorsSwitchProps = {
    colorDisabled: 'warning' | 'error' | 'info' | 'success' | 'primary'| 'secondary' 
    colorEnabled: 'warning' | 'error' | 'info' | 'success' | 'primary'| 'secondary' 
    checked: boolean
}

export const TwoColorsSwitch = styled(Switch)<TwoColorsSwitchProps>(({ colorDisabled, colorEnabled, checked, theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            
          color: 'white',
          '& + .MuiSwitch-track': {
            backgroundColor: theme.palette[colorEnabled].main,
            opacity: 0.5,
          },
          
        },
        '&.Mui-disabled': {
            '& + .MuiSwitch-track': {
                opacity: 0.5,
                backgroundColor: theme.palette[colorDisabled].main,
            }
        }
      },
      '& .MuiSwitch-track': {
        backgroundColor: theme.palette[colorDisabled].main,
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: checked? theme.palette[colorEnabled].main : theme.palette[colorDisabled].main,


      },
      
})
);