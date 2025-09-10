import type { Palette } from "@mui/material";

export type QuickActionButtonProps = {
    title: string;
    action: ()=> void;
    icon?: React.ReactNode;
    message?: string;
    color: Palette[ 'error' | 'warning' | 'info' | 'success'];
}