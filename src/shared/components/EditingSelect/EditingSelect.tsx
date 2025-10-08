import { Select, styled, type SelectProps } from "@mui/material";
import type React from "react";
import { theme } from "../../../theme/theme";

export const EditingSelect = styled(Select)({
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: theme.palette.common.black,
    },
    ".Mui-disabled": {
        background: theme.palette.background.default
    }
}) as <T>(props: SelectProps<T>) => React.ReactElement;
