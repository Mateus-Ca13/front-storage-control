import { styled, TextField } from "@mui/material";

export const EditingTextField = styled(TextField)(({ theme }) =>({
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: theme.palette.text.primary,
        
    },
    ".Mui-disabled": {
        background: theme.palette.background.default
    }
}));