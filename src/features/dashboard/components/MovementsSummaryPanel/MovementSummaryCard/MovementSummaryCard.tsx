import { formatMovementType, formatStringToMaxLength, formatTimestamp } from "../../../../../shared/utils/formatters"
import { BetweenFlexBox, CenterFlexBox, StartFlexBox } from "../../../../../shared/components/Boxes/Boxes"
import { Box, Button, Chip, Divider, Typography }  from "@mui/material"
import { theme } from "../../../../../theme/theme"
import type { MovementSummaryProps } from "../../../types/movementSummary"
import { ArrowForwardRounded, Visibility } from "@mui/icons-material"
import type { iMovementColumnConfig } from "../../../../../shared/types/movement"


export default function MovementSummaryCard( movement: iMovementColumnConfig & {onClick: (...args: any)=> any}) {
  return (
    
      <Button onClick={movement.onClick} sx={{ textTransform: 'none'}} variant="outlined" fullWidth>   
          <BetweenFlexBox>
            <Box my={1}>
              <StartFlexBox gap={1}>
                <Chip
                sx={{
                  color: movement.type === 'TRANSFER' ? 'warning.dark' : movement.type === 'ENTRY' ? 'success.dark' : 'error.dark',
                  backgroundColor: movement.type === 'TRANSFER' ? 'warning.light' : movement.type === 'ENTRY' ? 'success.light' : 'error.light',
                  border: `1px solid ${movement.type === 'TRANSFER' ? theme.palette.warning.main : movement.type === 'ENTRY' ? theme.palette.success.main : theme.palette.error.main}`
                }}
                label={formatMovementType(movement.type)} 
                size="small"/>
              </StartFlexBox>
              <StartFlexBox mt={1} height={20} gap={1}>
                <Typography variant="body2">{movement.totalProducts} Produtos</Typography>
                <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
                <Typography  variant="body2">{formatTimestamp(movement.createdAt, 'full')}</Typography>
                <Divider sx={{ bgcolor: theme.palette.primary.light}} orientation="vertical" />
                <StartFlexBox sx={{ flexWrap: 'wrap'}} gap={0.3}>
                  <Typography color={theme.palette.error.main} variant="body2">{formatStringToMaxLength(movement?.originStock?.name, 20)}</Typography>
                  <ArrowForwardRounded fontSize="small"/>
                  <Typography color={theme.palette.success.main} variant="body2">{formatStringToMaxLength(movement?.destinationStock?.name, 20)}</Typography>
                </StartFlexBox>
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