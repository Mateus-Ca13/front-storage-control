import { Checkbox, InputLabel } from '@mui/material'
import { StartFlexBox } from '../Boxes/Boxes'

type CheckboxProps = {
    checked: boolean
    label: string
    propValueSetter: () => void
}

export default function CheckboxOption({ label, checked, propValueSetter }: CheckboxProps) {
  return (
    <StartFlexBox>
        <Checkbox 
            sx={{ paddingLeft: 0, py: 0.5}}
            checked={checked} 
            onChange={() => {propValueSetter()}}/>
        <InputLabel sx={{fontWeight: 500}}>
        {label}
        </InputLabel>
    </StartFlexBox>
    
  )
}