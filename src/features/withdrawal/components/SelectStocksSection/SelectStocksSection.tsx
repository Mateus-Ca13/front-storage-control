import React, { useEffect, useState } from 'react'
import { Controller, type Control, type FieldErrors, type UseFormGetValues, type UseFormSetValue, type UseFormTrigger } from 'react-hook-form';
import type { MovementSchema } from '../../../../schemas/MovementSchema';
import { CenterColumnBox, CenterFlexBox, EndFlexBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes';
import { Autocomplete, Button, Checkbox, Chip, FormControlLabel, Typography } from '@mui/material';
import type { iStockColumnConfig } from '../../../../shared/types/stock';
import { useStocksQuery } from '../../../stocks/hooks/useStocksQuery';
import { EditingTextField } from '../../../../shared/components/TextField/TextField';
import { useKeyboardShortcuts } from '../../../../shared/hooks/useKeyboardShortcuts';
import { useToastStore } from '../../../../shared/store/toastStore';
import { ArrowDownwardRounded, ArrowRightAltRounded } from '@mui/icons-material';

type SelectStocksSectionProps = {
    
    formValueSetter: UseFormSetValue<MovementSchema>;
    formValueGetter: UseFormGetValues<MovementSchema>;
    formStepSetter: React.Dispatch<React.SetStateAction<"operationType" | "usedStocks" | "withdrawal">>
    formControl: Control<MovementSchema>
    formErrors: FieldErrors<MovementSchema>
    formTrigger: UseFormTrigger<MovementSchema>
}

export default function SelectStocksSection({formStepSetter, formValueGetter, formValueSetter, formTrigger, formControl, formErrors }: SelectStocksSectionProps) {

    const renderToast = useToastStore(state => state.renderToast)
    const [saveStockchecked, setSaveStockChecked] = React.useState(true);
    const [stocks, setStocks] = useState<iStockColumnConfig[]>([])
    const {data: stocksData, isLoading: stocksLoading, error: stocksError} = useStocksQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name', type: null})
    

    const handleSaveStockChange = () => {
        setSaveStockChecked(prev => !prev);
    };

    const originStockRef = React.useRef<HTMLInputElement>(null)
    const destinationStockRef = React.useRef<HTMLInputElement>(null)
    const isExitMovement = formValueGetter('type') === 'EXIT'

    useEffect(() => {
        const stocks = stocksData?.data?.stocks ?? [];
        console.log(stocks)
        setStocks(stocks)
    }, [stocksData]);

    useEffect(() => {
        //originStockRef.current?.focus()
        formValueSetter('destinationStockId', null)
        formValueSetter('originStockId', null)
    }, [])

    useKeyboardShortcuts ({
        'Tab': () => {
            const isFocused = document.activeElement === destinationStockRef.current;
            if (isFocused) originStockRef.current?.focus();
            else destinationStockRef.current?.focus();
        },
        'F1': () => {
            originStockRef.current?.focus();
        },
        'F2': () => {
            destinationStockRef.current?.focus();
        },
        'F3': () => {
            handleStockStep()
        },
        'Escape': () => {
            formStepSetter('operationType')
        },
        'F4': () => {
            handleSaveStockChange()
        }
    })

    const handleStockStep = async () => {
        
        const canGoNext = await formTrigger(["originStockId", "destinationStockId"]);

        if (canGoNext) {
            renderToast({message: 'deu bom', type: 'success', })
            formStepSetter('withdrawal')
        } else {
            renderToast({message: 'deu ruim', type: 'error', })
            console.log(formErrors);
            
        }   
    }




  return (
    <CenterColumnBox width={'100%'} gap={6}>
        <CenterFlexBox alignItems={'start !important'} gap={2} width={'100%'}>
            <Chip sx={{ borderRadius: 1, py: 3.8, px: 1, fontWeight: 600, fontSize: 16}} color='primary' variant='filled' label={'[F1]'}/>
            <Controller
            name="originStockId"
            rules={{ required: true }}
            control={formControl}
            render={({ field }) => (
            <Autocomplete
            noOptionsText="Nenhum estoque encontrado."
            fullWidth
            autoHighlight
            openOnFocus
            options={stocks.map((s)=>({label: s.name, value: s.id}))}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <li {...props} style={{gap: 2}}>
                    <Typography variant='h6'  fontWeight={400}>{option.label}</Typography>
                    
                </li>
            )}
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            onChange={(_, value) => {field.onChange(value?.value)}} // valor real
            renderInput={(params) =>

                (<EditingTextField
                {...params}
                inputRef={originStockRef}
                sx={{
                    height: '100%',
                    "& .MuiInputBase-input": {
                    fontSize: "1.5rem",      // tamanho do texto digitado
                    },
                    "& .MuiFormHelperText-root": {
                    fontSize: "1rem",     // helper/error
                    }
                }}
                fullWidth 
                variant='outlined'
                label={<Typography variant='h6' fontWeight={400}>Estoque de origem</Typography>}
                placeholder='De onde está saindo...'
                error={!!formErrors.originStockId}
                helperText={formErrors.originStockId?.message}
                />)}
            />)}
            />
        </CenterFlexBox>
        <CenterFlexBox alignItems={'start !important'} gap={2} width={'100%'}>
            
            <Chip sx={{ borderRadius: 1, py: 3.8, px: 1, fontWeight: 600, fontSize: 16}} color={isExitMovement ? 'secondary' : 'primary'} variant='filled' label={'[F2]'}/>
            <Controller
            name="destinationStockId"
            rules={{ required: true }}
            control={formControl}
            render={({ field }) => (
            <Autocomplete
            noOptionsText="Nenhum estoque encontrado."
            renderOption={(props, option) => (
                <li {...props} style={{gap: 2}}>
                    <Typography variant='h6' fontWeight={400}>{option.label}</Typography>
                </li>
            )}
            autoHighlight
            openOnFocus
            fullWidth
            disabled={formValueGetter('type') === 'EXIT'}
            options={stocks.map((s)=>({label: s.name, value: s.id}))}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(opt, val) => opt.value === val.value}
            onChange={(_, value) => {field.onChange(value?.value); }} // valor real
            renderInput={(params) =>

                (<EditingTextField
                {...params}
                inputRef={destinationStockRef}
                sx={{
                    height: '100%',
                    "& .MuiInputBase-input": {
                    fontSize: "1.5rem",      // tamanho do texto digitado
                    },
                    "& .MuiFormHelperText-root": {
                    fontSize: "1rem",     // helper/error
                    }
                }}
                fullWidth 
                variant='outlined'
                label={<Typography variant='h6' fontWeight={400}>{isExitMovement? 'Desativado para mov. de saída' :'Estoque de destino'}</Typography>}
                placeholder={isExitMovement? 'Desativado para movimentações de saída...' :'Para onde está indo...'}
                error={!!formErrors.destinationStockId}
                helperText={formErrors.destinationStockId?.message}
                />)}
            />)}
            />
                            
        </CenterFlexBox>
        <StartFlexBox alignItems={'center'} sx={{width: '100%'}} mb={8}>
            <FormControlLabel control={<Checkbox checked={saveStockchecked} onChange={handleSaveStockChange} slotProps={{input: { 'aria-label': 'controlled' }}} size='large'/>} sx={{'& .MuiFormControlLabel-label': {fontSize: 18}}} label={<Typography variant='h6'>Salvar estoque de origem para próximas operações <strong>[F4]</strong></Typography>} />
        </StartFlexBox>
        <EndFlexBox  gap={2} sx={{width: '100%'}}>
            <Button onClick={()=>formStepSetter('operationType')} variant='outlined' sx={{ fontSize: 22, textTransform: 'none', py: 2, px: 8}}>
                <Typography variant='h6'>Voltar<strong> [ESC]</strong></Typography>
            </Button>
            <Button variant='contained' onClick={() => handleStockStep()} sx={{ fontSize: 22, textTransform: 'none', py: 2, px: 8}}>
                <Typography variant='h6'>Continuar<strong> [F3]</strong></Typography>
            </Button>
        </EndFlexBox>
    </CenterColumnBox>
  )
}
