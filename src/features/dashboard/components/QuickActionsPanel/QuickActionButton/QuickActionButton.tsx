
import { Box, Button, styled, Typography, useTheme } from '@mui/material'
import type { QuickActionButtonProps } from '../../../types/QuickActionButton'
export const StyledQuickActionButton = styled(Button)(({ theme }) =>({
    padding: 16,
    color: theme.palette.common.black,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%", 
    textTransform: "none",
    "& .MuiSvgIcon-root": { transition: "0.6s" },
}))

export default function QuickActionButton( quickAction : QuickActionButtonProps) {

    const theme = useTheme()
    return (
        <StyledQuickActionButton onClick={quickAction.action} 
        sx={{
            border: `1px solid ${quickAction.color.main}`,
            ":hover": {
                bgcolor: theme.palette.mode === "light" ?quickAction.color.light : quickAction.color.dark,
                "& .MuiSvgIcon-root": {
                transform: "scale(1.1)"
                },
            },
            }}>
            <Box sx={{color: quickAction.color.main }}>{quickAction.icon}</Box>
            <Typography variant='h6' fontWeight={500} color={theme.palette.primary.main}>{quickAction.title}</Typography>
            <Typography variant='body2' >{quickAction.message}</Typography>
        </StyledQuickActionButton>
    )
}