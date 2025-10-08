import { styled, TextField } from "@mui/material";
import { theme } from "../../../theme/theme";

export const EditingTextField = styled(TextField)({
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: theme.palette.text.primary,
        
    },
    ".Mui-disabled": {
        background: theme.palette.background.default
    }
})