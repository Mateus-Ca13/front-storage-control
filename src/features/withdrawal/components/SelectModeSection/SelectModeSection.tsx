import React from 'react'
import { CenterColumnBox, CenterFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { Button, Typography } from '@mui/material'
import { RemoveCircleOutlineRounded, SwapHorizontalCircleOutlined } from '@mui/icons-material'
import { useKeyboardShortcuts } from '../../../../shared/hooks/useKeyboardShortcuts'
import type { MovementSchema } from '../../../../schemas/MovementSchema'
import type { UseFormSetValue } from 'react-hook-form'

interface SelectModeSectionProps {
    formValueSetter: UseFormSetValue<MovementSchema>;
    formStepSetter: React.Dispatch<React.SetStateAction<"operationType" | "usedStocks" | "withdrawal">>
}


export default function SelectModeSection({ formValueSetter, formStepSetter } : SelectModeSectionProps) {

    const onExitClick = () => {
        formValueSetter('type', 'EXIT')
        formValueSetter('destinationStockId', null)
        formStepSetter('usedStocks')
    }

    const onTransferClick = () => {
        formValueSetter('type', 'TRANSFER')
        formStepSetter('usedStocks')
    }

    useKeyboardShortcuts({
        'F1': onExitClick,
        'F2': onTransferClick,
    }, 1)

  return (
     <CenterColumnBox width={'100%'}>
        <CenterFlexBox gap={2} width={'100%'}>
            <Button fullWidth onClick={onExitClick} variant='contained' sx={{ fontSize: 24, textTransform: 'none', py: 4, px: 8}}>
                <CenterFlexBox gap={2}>
                    <RemoveCircleOutlineRounded sx={{fontSize: 36}}/>
                    <Typography variant='h6'>Saída <strong>[F1]</strong></Typography> 
                </CenterFlexBox>
            </Button>
            <Button fullWidth onClick={onTransferClick} variant='contained' sx={{ fontSize: 24, textTransform: 'none', py: 4, px: 8}}>
                <CenterFlexBox gap={2}>
                    <SwapHorizontalCircleOutlined sx={{fontSize: 36}}/>
                    <Typography variant='h6'>Transferência <strong>[F2]</strong></Typography>                      
                </CenterFlexBox>
            </Button>
        </CenterFlexBox>
    </CenterColumnBox>
  )
}
