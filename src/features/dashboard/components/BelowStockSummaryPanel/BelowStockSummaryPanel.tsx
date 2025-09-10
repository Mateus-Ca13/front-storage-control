import { Button, Grid, Typography } from '@mui/material'
import { CardLayout } from '../../../../shared/components/Cards/Cards'
import { CenterColumnBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { theme } from '../../../../theme/theme'
import type { BelowStockSummaryProps } from '../../types/belowStockSsummary'
import BelowStockSummaryCard from './BelowStockSummaryCard/BelowStockSummaryCard'
import { useNavigate } from 'react-router-dom'

export default function BelowStockSummaryPanel() {

    const navigate = useNavigate()
    const belowStockProducts: BelowStockSummaryProps[] = [
        { productId: 'PROD001', category: {id: 'CAT001', name: 'Alimentos Perecíveis', colorPreset: 1},  productName: 'Leite Tirol 1L', stockQuantity: 50, minStockRecomended: 100 },
        { productId: 'PROD002', category: {id: 'CAT002', name: 'Utilitários', colorPreset: 2}, productName: 'Saco de Lixo 50L', stockQuantity: 30, minStockRecomended: 50 },
        { productId: 'PROD003', category: {id: 'CAT003', name: 'Produtos de Limpeza', colorPreset: 3}, productName: 'Água sanitária 5L Qboa', stockQuantity: 20, minStockRecomended: 75 },

    ]

  return (
    <Grid size={{xl: 6, lg:6, md: 12, sm: 12, xs: 12}}>
      <CardLayout sx={{ padding: 2, height: '100%'  }}>
        <StartColumnBox>
          <Typography variant="h5" fontWeight={500} color={theme.palette.primary.main}>Produtos em alerta</Typography>
          <Typography variant="body2">Produtos que estão abaixo do estoque ideal</Typography>
        </StartColumnBox>
          <CenterColumnBox sx={{ gap: 2, mt: 3}}>
          {belowStockProducts.map((product) => <BelowStockSummaryCard onClick={()=>navigate(`products/${product.productId}`)} key={product.productId} {...product}/>)}
          <Button onClick={()=>navigate('products')} fullWidth variant="outlined"sx={{p: 2}}>
            <Typography fontWeight={600} sx={{textTransform: 'none'}} variant="body1">Ver todos os produtos</Typography>
          </Button>
          </CenterColumnBox>
      </CardLayout>
    </Grid>
  )
}
