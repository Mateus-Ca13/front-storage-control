import { Grid } from '@mui/material'
import { CardLayout } from '../../../../shared/components/Cards/Cards'
import SummaryCard from '../SummaryCard/SummaryCard'
import { Inventory2Rounded, SyncAltOutlined, WarehouseRounded, WarningRounded } from '@mui/icons-material'
import { theme } from '../../../../theme/theme'
import { useEffect, useState } from 'react'
import { MainSummaryApi } from '../../api/dashboardApi'
import type { AsyncResponseDataProps } from '../../../../shared/types/response'

type summaryDataProps = AsyncResponseDataProps<typeof MainSummaryApi>
export default function SummaryDashboard() {

    const [summaryData, setSummaryData] = useState<summaryDataProps['data']>({
      productsBelowMinStock: 0,
      totalMovementsLastWeek: 0,
      totalProductsRegistered: 0,
      totalStockedQuantity: 0,
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
          <SummaryCard icon={<Inventory2Rounded sx={{ color: theme.palette.primary.main}}/>} title="Produtos cadastrados" value={summaryData!.totalProductsRegistered} type="downgrade" warning message="Nenhuma alteração recente" />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard icon={<WarehouseRounded sx={{ color: theme.palette.primary.main}}/>} title="Produtos em estoque" value={summaryData!.totalStockedQuantity} type="upgrade" message="+12 desde ontem" />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard icon={<WarningRounded sx={{ color: theme.palette.primary.main}}/>} title="Produtos em alerta" value={summaryData!.productsBelowMinStock} type="warning" message="Atenção necessária" />
        </CardLayout>
      </Grid>
      <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}>
        <CardLayout sx={{ padding: 2 }}>
          <SummaryCard icon={<SyncAltOutlined sx={{ color: theme.palette.primary.main}}/>} title="Movimentações nesta semana" value={summaryData!.totalMovementsLastWeek} type="normal" message="4 desde ontem" />
        </CardLayout>
      </Grid>
      </>
  )
}
