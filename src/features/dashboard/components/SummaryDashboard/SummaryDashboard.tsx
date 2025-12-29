import { Grid, useTheme } from '@mui/material'
import { CardLayout } from '../../../../shared/components/Cards/Cards'
import SummaryCard from '../SummaryCard/SummaryCard'
import { CategoryRounded, SyncAltOutlined, WarehouseRounded, WarningRounded } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { MainSummaryApi } from '../../api/dashboardApi'
import type { AsyncResponseDataProps } from '../../../../shared/types/response'

type summaryDataProps = AsyncResponseDataProps<typeof MainSummaryApi>
export default function SummaryDashboard() {
  
    const theme = useTheme()
    const [summaryData, setSummaryData] = useState<summaryDataProps['data']>({
      productsBelowMinStock: {value: 0, metrics: ''},
      totalMovementsLastWeek: {value: 0, metrics: ''},
      totalProductsRegistered: {value: 0, metrics: ''},
      totalStockedQuantity: {value: 0, metrics: ''},
    })

    useEffect(() => {
    fetchMainSummary()
    }, [])

    const fetchMainSummary = async () =>{
        const response = await MainSummaryApi()

        if(response.data){
            console.log(response.data)
            setSummaryData(response.data)
        }else{
            console.log("Erro ao buscar dados")
        }
    }

  return (
    <>
    <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard 
            icon={<CategoryRounded 
            sx={{ color: theme.palette.primary.main}}/>} 
            title="Produtos cadastrados" 
            value={summaryData!.totalProductsRegistered.value} 
            type="upgrade" warning message={summaryData!.totalProductsRegistered.metrics} />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard 
            icon={<WarehouseRounded 
            sx={{ color: theme.palette.primary.main}}/>} 
            title="Produtos em estoque" 
            value={summaryData!.totalStockedQuantity.value} 
            type="downgrade" 
            message={summaryData!.totalStockedQuantity.metrics} />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard 
            icon={<WarningRounded 
            sx={{ color: theme.palette.primary.main}}/>} 
            title="Produtos em alerta" 
            value={summaryData!.productsBelowMinStock.value} 
            type="warning" 
            message={summaryData!.productsBelowMinStock.metrics} />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard 
            icon={<SyncAltOutlined 
            sx={{ color: theme.palette.primary.main}}/>} 
            title="Movimentações nesta semana" 
            value={summaryData!.totalMovementsLastWeek.value} 
            type="normal" 
            message={summaryData!.totalMovementsLastWeek.metrics} />
        </CardLayout>
      </Grid>
      </>
  )
}
