import { Box, Chip, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import type { SearchFiltersProps } from '../../../features/products/pages/ProductsPage'
import type { SetStateAction } from 'react'
import { theme } from '../../../theme/theme'

type MultipleSelectProps = {
    options: string[]
    selectedValues: string[]
    selectedValueSetter: React.Dispatch<SetStateAction<SearchFiltersProps>>
}

export default function MultipleSelect({ options, selectedValueSetter, selectedValues }: MultipleSelectProps) {

    const handleChange = (event: SelectChangeEvent<typeof options>) => {
        const {target: { value }} = event;
        selectedValueSetter((prev)=> ({...prev, categoriesIds: typeof value === 'string' ? value.split(',') : value }));
    };

  return (
   <Select
    multiple
    fullWidth
    color='primary'
    MenuProps={{
        slotProps: {
            paper: {
                sx: {
                    'maxHeight': 200,
                }
            }
    }}}
    sx={{
       "& .MuiSelect-select": {
      display: "flex",
      flexWrap: "wrap",
      gap: 4,
      maxHeight: 64,     // Limite de altura do container dos chips
      overflowY: "auto",
    },
    }}
    displayEmpty
    renderValue={(selectedValues: string[]) => (
            <>
            {selectedValues.length === 0 && <em>Selecione as categorias</em>}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                
                {selectedValues.map((value) => (
                <Chip color='primary' key={value} label={value} />
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
                        backgroundColor: theme.palette.secondary.light,
                    }
                },
            }}
            key={option}
            value={option}
            >
            {option}
            </MenuItem>
        ))}
    </Select>
  )
}