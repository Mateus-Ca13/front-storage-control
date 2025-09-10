import { Box, Button, Divider, Typography } from '@mui/material';
import { BetweenFlexBox, CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../../shared/components/Boxes/Boxes';
import type { BelowStockSummaryProps } from '../../../types/belowStockSsummary';
import { theme } from '../../../../../theme/theme';
import { Visibility } from '@mui/icons-material';
import { CategoryChip } from '../../../../../shared/components/Chips/Chips';


export default function BelowStockSummaryCard({ /*productId,*/ category, productName, minStockRecomended, stockQuantity, onClick}: BelowStockSummaryProps & {onClick: (...args: any)=> any}) {
  debugger
  return (
    <Button onClick={onClick} sx={{ textTransform: 'none'}} variant="outlined" fullWidth>   
      <BetweenFlexBox>
        <Box my={1}>
          <StartColumnBox gap={1}>
            <CenterFlexBox gap={1}>
              <Typography variant="body2" fontWeight={600}> {productName}</Typography>
              <CategoryChip
                  colorPreset={category.colorPreset}
                  label={category.name} 
                  size="small"/>
            </CenterFlexBox>
            <StartFlexBox height={20} gap={1}>
              <Typography variant="body2" color='error'>{stockQuantity} Unidades restantes</Typography>
              <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
              <Typography variant="body2">Estoque mínimo recomendado: {minStockRecomended}</Typography>
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