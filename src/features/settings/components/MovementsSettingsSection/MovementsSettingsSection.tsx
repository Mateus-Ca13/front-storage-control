import { Divider, MenuItem, Typography, useTheme } from "@mui/material";
import { CenterFlexBox, StartColumnBox, StartFlexBox } from "../../../../shared/components/Boxes/Boxes";
import { useSettingsStore } from "../../stores/SettingsStore";
import { EditingSelect } from "../../../../shared/components/EditingSelect/EditingSelect";
import { useStocksQuery } from "../../../stocks/hooks/useStocksQuery";
import { useEffect, useState } from "react";
import type { iStockColumnConfig } from "../../../../shared/types/stock";
import { InfoOutline } from "@mui/icons-material";
import { LightTooltip } from "../../../../shared/components/Tooltip/Tooltip";


export default function MovementsSettingsSection() {
  const setSettings = useSettingsStore((state) => state.setSettings)
  const defaultOriginStockId = useSettingsStore((state) => state.defaultOriginStockId)
    const {data: stockData } = useStocksQuery(0, 1000, '', {orderBy: 'asc', sortBy: 'name', type: null})
    const [stocks, setStocks] = useState<iStockColumnConfig[]>([])
    const theme = useTheme()

    useEffect(() => {
        const stocks = stockData?.data?.stocks ?? [];
        setStocks(stocks);
    }, [stockData])



  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Movimentações</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox mt={2}>
            <CenterFlexBox gap={2}  width={'100%'}>
                <StartFlexBox gap={1}  marginRight={'auto'}>
                    <Typography fontWeight={700} variant='body1'>Estoque padrão (Caixa) </Typography>
                    <LightTooltip title="Determina um estoque de origem para movimentações de produtos a partir da interface de caixa (operacional)">
                    <InfoOutline fontSize="small" color='secondary'/>
                    </LightTooltip>
                </StartFlexBox>
                <EditingSelect
                    sx={{width: '50%'}}
                    variant='outlined' 
                    value={defaultOriginStockId}
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                    }}
                    onChange={(e)=>{setSettings("defaultOriginStockId", Number.isNaN(Number(e.target.value)) ? null : Number(e.target.value));
                    }}
                    labelId="select-rowsPerPage"
                    >
                        <MenuItem value={undefined}>
                                <Typography variant='body2'>Nenhum</Typography>
                        </MenuItem>
                        {stockData?.data?.stocks?.map((stock, index)=>{
                            return (
                                <MenuItem value={stock.id} key={index}>
                                    <Typography variant='body2'>{stock.name}</Typography>
                                </MenuItem>
                                )
                        })}
                    
                    </EditingSelect>
            </CenterFlexBox>
        </StartColumnBox>
        
    </StartColumnBox>
    
  )
}
