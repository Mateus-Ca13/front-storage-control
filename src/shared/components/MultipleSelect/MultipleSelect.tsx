import { Box, Chip, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { theme } from '../../../theme/theme'

type MultipleSelectProps = {
    options: MultipleSelectOptionProps[]
    selectedValues: string[]
    selectedValueSetter: (...args: any[]) => void
}

type MultipleSelectOptionProps = {
    name: string;
    value: string | number;
}


export default function MultipleSelect({ options, selectedValueSetter, selectedValues }: MultipleSelectProps) {

    const handleChange = (event: SelectChangeEvent<typeof options[number]['value'][]>) => {
        
        const {target: { value }} = event ;
        selectedValueSetter(typeof value === 'string' ? value.split(',') : value);
    };

  return (
   <Select
        multiple
        rows={2}
        fullWidth
        color='primary'
        MenuProps={{
            PaperProps: {
                style: { maxHeight: 48 * 4.5 + 8, width: 250 },
            },
        }}
        sx={{
        "& .MuiSelect-select": {
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        maxHeight: 64,   
        overflowY: "auto",
        },
        }}
        displayEmpty
        renderValue={(selectedValues: string[]) => (
                <>
                {selectedValues.length === 0 && <em>Selecione as categorias</em>}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    
                    {selectedValues.map((value) => (
                    <Chip color='primary' key={value} label={options.filter((option)=>option.value === value)[0].name} />
                    ))}
                </Box>
                </>
            )}
        onChange={handleChange}
        value={selectedValues}
        
        >
        {options.map((option) => (
            <MenuItem
            sx={{
                "&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.background.default,
                    ':hover': {
                        backgroundColor: theme.palette.secondary.main,
                    }
                },
            }}
            key={option.value}
            value={option.value}
            >
            {option.name}
            </MenuItem>
        ))}
    </Select>
  )
}