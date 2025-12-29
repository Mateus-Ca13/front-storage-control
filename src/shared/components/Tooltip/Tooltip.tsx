import { styled, Tooltip, tooltipClasses, type TooltipProps } from "@mui/material";

export const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey[800],
    border: `1px solid ${theme.palette.grey[500]}`,
    fontSize: 12,
  },
}));