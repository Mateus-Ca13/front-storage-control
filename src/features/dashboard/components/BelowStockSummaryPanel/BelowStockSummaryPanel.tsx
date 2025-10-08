import { Button, Grid, Typography } from '@mui/material'
import { CardLayout } from '../../../../shared/components/Cards/Cards'
import { CenterColumnBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { theme } from '../../../../theme/theme'
import BelowStockSummaryCard from './BelowStockSummaryCard/BelowStockSummaryCard'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useProductsQuery } from '../../../products/hooks/useProductsQuery'
import type { iProductColumnConfig } from '../../../../shared/types/product'

export default function BelowStockSummaryPanel() {

    const navigate = useNavigate()
    const [belowStockProducts,setBelowStockProducts] = useState<iProductColumnConfig[]>([])
    const { data, isLoading, error } = useProductsQuery(0, 5, '', {isBelowMinStock: true, categoriesIds: [], hasNoCodebar: false})
    
    useEffect(() => {
      const products = data?.data?.products ?? [];
  
      setBelowStockProducts(products);
    }, [data]);


  return (
    <Grid size={{xl: 6, lg:6, md: 12, sm: 12, xs: 12}}>
      <CardLayout sx={{ padding: 2, height: '100%'  }}>
        <StartColumnBox>
          <Typography variant="h5" fontWeight={500} color={theme.palette.primary.main}>Produtos em alerta</Typography>
          <Typography variant="body2">Produtos que estão abaixo do estoque ideal</Typography>
        </StartColumnBox>
          <CenterColumnBox sx={{ gap: 2, mt: 3}}>
          {belowStockProducts.map((product) => <BelowStockSummaryCard onClick={()=>navigate(`products/${product.id}`)} key={product.id} product={product}/>)}
          <Button onClick={()=>navigate('/dashboard/products')} fullWidth variant="outlined"sx={{p: 2}}>
            <Typography fontWeight={600} sx={{textTransform: 'none'}} variant="body1">Ver todos os produtos</Typography>
          </Button>
          </CenterColumnBox>
      </CardLayout>
    </Grid>
  )
}
