import { Box, Button, Divider, Typography } from '@mui/material';
import { BetweenFlexBox, CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../../shared/components/Boxes/Boxes';
import type { BelowStockSummaryProps } from '../../../types/belowStockSsummary';
import { theme } from '../../../../../theme/theme';
import { Visibility } from '@mui/icons-material';
import { CategoryChip } from '../../../../../shared/components/Chips/Chips';
import type { iProductColumnConfig } from '../../../../../shared/types/product';

type BelowStockSummaryCardProps = {
  product: iProductColumnConfig
  onClick: (...args: any)=> any
}


export default function BelowStockSummaryCard({ product, onClick}: BelowStockSummaryCardProps) {
  
  return (
    <Button onClick={onClick} sx={{ textTransform: 'none'}} variant="outlined" fullWidth>   
      <BetweenFlexBox>
        <Box my={1}>
          <StartColumnBox gap={1}>
            <CenterFlexBox gap={1}>
              <Typography variant="body2" fontWeight={600}> {product.name}</Typography>
              {product.category &&<CategoryChip
                  colorPreset={product.category?.colorPreset || 0}
                  label={product.category?.name || 'Sem categoria'} 
                  size="small"/>}
            </CenterFlexBox>
            <StartFlexBox height={20} gap={1}>
              <Typography variant="body2" color='error'>{product.stockedQuantities} Unidades restantes</Typography>
              <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
              <Typography variant="body2">Estoque mínimo recomendado: {product.minStock}</Typography>
            </StartFlexBox>
            
          </StartColumnBox>
        </Box>
        <CenterFlexBox gap={1}>
          <Visibility/>
          <Typography variant="body2">Ver produto</Typography>
        </CenterFlexBox>
      </BetweenFlexBox>
    </Button>

  )
}