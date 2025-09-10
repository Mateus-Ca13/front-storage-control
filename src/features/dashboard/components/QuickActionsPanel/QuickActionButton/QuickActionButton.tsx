
import { theme } from '../../../../../theme/theme'
import { Box, Button, styled, Typography } from '@mui/material'
import type { QuickActionButtonProps } from '../../../types/QuickActionButton'



export const StyledQuickActionButton = styled(Button)({
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
})

export default function QuickActionButton( quickAction : QuickActionButtonProps) {


    return (
        <StyledQuickActionButton onClick={quickAction.action} 
        sx={{
            border: `1px solid ${quickAction.color.main}`,
            ":hover": {
                bgcolor: quickAction.color.light,
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