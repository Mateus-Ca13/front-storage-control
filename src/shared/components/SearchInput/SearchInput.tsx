import { SearchRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { theme } from "../../../theme/theme";

type SearchInputProps = {
    placeholder: string;
    value: string;
    valueSetter: (value: string) => void;
    onChange?: (event: React.ChangeEvent) => void;
}


export default function SearchInput({value, valueSetter, placeholder, onChange} : SearchInputProps) {
  return (
    <TextField 
    sx={{
        bgcolor: theme.palette.background.default
    }}
    fullWidth 
    slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRounded />
              </InputAdornment>
            ),
          },
        }} 
        value={value} 
        onChange={(event) => {
          valueSetter(event.target.value); 
          onChange? onChange(event) : null;
        }} 
        placeholder={placeholder} />
  )
}
