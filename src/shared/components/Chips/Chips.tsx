import { Chip, styled } from "@mui/material";
import { theme } from "../../../theme/theme";

type CategoryChipProps = {
    colorPreset: number
}

type TwoColorsChipProps = {
    colorPreset: 'warning' | 'error' | 'info' | 'success' | 'primary'| 'secondary' 
}


export const CategoryChip = styled(Chip)<CategoryChipProps>(({ colorPreset })=>({
    backgroundColor: theme.palette.categoryColors[`category${colorPreset}`].light,
    border: `1px solid ${theme.palette.categoryColors[`category${colorPreset}`].main}`,
    color: theme.palette.categoryColors[`category${colorPreset}`].dark,
}))


export const TwoColorsChip = styled(Chip)<TwoColorsChipProps>(({ colorPreset })=>({
    backgroundColor: theme.palette[colorPreset].light,
    border: `1px solid ${theme.palette[colorPreset].main}`,
    color: theme.palette[colorPreset].dark,
}))
