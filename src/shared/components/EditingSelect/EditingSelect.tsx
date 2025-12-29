import { Select, styled, type SelectProps } from "@mui/material";
import type React from "react";

export const EditingSelect = styled(Select)(({ theme }) =>({
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: theme.palette.common.black,
    },
    ".Mui-disabled": {
        background: theme.palette.background.default
    }
})) as <T>(props: SelectProps<T>) => React.ReactElement;
