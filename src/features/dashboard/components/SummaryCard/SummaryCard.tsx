import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material';
import { InfoOutlineRounded, MovingRounded, TrendingDownRounded, WarningRounded } from '@mui/icons-material';
import { theme } from '../../../../theme/theme';
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes';

type SummaryCardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    message?: string;
    warning?: boolean;
    type: 'upgrade' | 'downgrade' | 'warning' | 'normal';
}

export default function SummaryCard({title, value, icon, message, warning, type }: SummaryCardProps) {

    const [messageType, setMessageType] = useState<{color: string, icon: React.ReactNode} | undefined>()

    useEffect(() => {
        iconSetter()
    }, [type])

    function iconSetter() {
        switch(type){
            case 'upgrade':
                setMessageType({color: theme.palette.success.main, icon: <MovingRounded fontSize='small' sx={{ color: theme.palette.success.main, mr: 1}}/>})
                break;
            case 'downgrade':
                setMessageType({color: theme.palette.error.main, icon: <TrendingDownRounded fontSize='small' sx={{ color: theme.palette.error.main, mr: 1}}/>})
                break;
            case 'warning':
                setMessageType({color: theme.palette.warning.main, icon: <WarningRounded fontSize='small' sx={{ color: theme.palette.warning.main, mr: 1}}/>})
                break;
            case 'normal':
                setMessageType({color: theme.palette.common.black, icon: <InfoOutlineRounded fontSize='small' sx={{ color: theme.palette.common.black, mr: 1}}/>})
                break;
        }
    }


  return (
    <StartColumnBox sx={{ justifyContent: 'space-between', height: '100%' }}>
        <BetweenFlexBox sx={{ mb: 1}}> 
            <Typography variant="h6" sx={{color: theme.palette.primary.main, mr: 2}} >{title}</Typography>
            {icon}
        </BetweenFlexBox>
        <Typography variant="h5" sx={{fontWeight: 700}} gutterBottom>{value}</Typography>
        <CenterFlexBox sx={{}}> 
            {messageType?.icon}
            <Typography variant='body2' sx={{
                color: messageType?.color,
            }}>{message}</Typography>
        </CenterFlexBox>
    </StartColumnBox>  
    )
}