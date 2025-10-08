import { Box, styled } from "@mui/material";

type CategoryBadgeProps = {
    colorPreset: number
}

export const CategoryColorBadge = styled(Box)<CategoryBadgeProps>(({ colorPreset, theme }) => ({
    height: '1.5em',
    minWidth: '1.5em',
    maxWidth: '3.5em',
    width: '100%',
    borderRadius: 16,
    backgroundColor: theme.palette.categoryColors[`category${colorPreset}`].light,
    border: `1px solid ${theme.palette.categoryColors[`category${colorPreset}`].main}`,
    color: theme.palette.categoryColors[`category${colorPreset}`].dark,
}
))

