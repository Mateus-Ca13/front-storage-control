import { formatMovementType, formatTimestamp } from "../../../../../shared/utils/formatters"
import { BetweenFlexBox, CenterFlexBox, StartFlexBox } from "../../../../../shared/components/Boxes/Boxes"
import { Box, Button, Chip, Divider, Typography }  from "@mui/material"
import { theme } from "../../../../../theme/theme"
import type { MovementSummaryProps } from "../../../types/movementSummary"
import { ArrowForwardRounded, Visibility } from "@mui/icons-material"


export default function MovementSummaryCard( {id, createdAt, destinationStockName, originStockName, totalProducts, onClick, type}: MovementSummaryProps & {onClick: (...args: any)=> any}) {
  return (
    
      <Button onClick={onClick} sx={{ textTransform: 'none'}} variant="outlined" fullWidth>   
          <BetweenFlexBox>
            <Box my={1}>
              <StartFlexBox gap={1}>
                <Typography variant="body2" fontWeight={600}>{id}</Typography>
                <Chip
                sx={{
                  color: type === 'TRANSFER' ? 'warning.dark' : type === 'ENTRY' ? 'success.dark' : 'error.dark',
                  backgroundColor: type === 'TRANSFER' ? 'warning.light' : type === 'ENTRY' ? 'success.light' : 'error.light',
                  border: `1px solid ${type === 'TRANSFER' ? theme.palette.warning.main : type === 'ENTRY' ? theme.palette.success.main : theme.palette.error.main}`
                }}
                label={formatMovementType(type)} 
                size="small"/>
              </StartFlexBox>
              <StartFlexBox mt={1} height={20} gap={1}>
                <Typography variant="body2">{totalProducts} Produtos</Typography>
                <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
                <Typography  variant="body2">{formatTimestamp(createdAt)}</Typography>
                <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
                <CenterFlexBox gap={0.3}>
                  <Typography fontWeight={600} color={theme.palette.error.main} variant="body2">{originStockName}</Typography>
                  <ArrowForwardRounded fontSize="small"/>
                  <Typography fontWeight={600} color={theme.palette.success.main} variant="body2">{destinationStockName}</Typography>
                </CenterFlexBox>
              </StartFlexBox>
            </Box>
            <CenterFlexBox gap={1}>
              <Visibility/>
              <Typography variant="body2">Ver mais</Typography>
            </CenterFlexBox>
          </BetweenFlexBox>
      </Button> 
  )
}