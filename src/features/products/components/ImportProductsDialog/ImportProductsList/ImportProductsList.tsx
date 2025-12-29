import type { iProductsImportCsvReturn } from '../../../../../shared/types/product'
import {  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { formatPrice } from '../../../../../shared/utils/formatters'
import { LightTooltip } from '../../../../../shared/components/Tooltip/Tooltip'
import { WarningAmberRounded } from '@mui/icons-material'
import { StartFlexBox } from '../../../../../shared/components/Boxes/Boxes'

type ImportProductsListProps = {
  importedProducts: iProductsImportCsvReturn[]
}


export default function ImportProductsList({importedProducts}: ImportProductsListProps) {

  const theme = useTheme()
  return (
    <TableContainer 
    sx={{
        "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px"
        },
        "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.grey[400],
        borderRadius: "8px"
        },
        "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: theme.palette.grey[500],
        },
        "&::-webkit-scrollbar-track": {
        backgroundColor: theme.palette.grey[200]
        },
    }} 
    component={Paper}>
      <Table  stickyHeader sx={{ maxHeight: 400}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Nome</TableCell>
            <TableCell align="center">Código de barras</TableCell>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Último preço pago</TableCell>
            <TableCell align="center">Estoque mínimo</TableCell>
            <TableCell align="center">Unidade de medida</TableCell>
            <TableCell align="center">Categoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {importedProducts.map((row) => (
                <LightTooltip placement='bottom-start' sx={{ maxWidth: 300}} title={
                
                !row.success && row.errors.flatMap((error) => 
                <StartFlexBox gap={0.5}>
                <WarningAmberRounded color='error' fontSize='small'/>
                <Typography variant='body2' color='error'>{error.message}</Typography>
                </StartFlexBox>)
                }
                >       
                    <TableRow
                    key={row.data.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: row.success ? 'common.white' : 'error.light'}}
                    >
                    <TableCell component="th" scope="row">{row.data.name}</TableCell>
                    <TableCell align="center">{row.data.codebar}</TableCell>
                    <TableCell align="center">{row.data.description}</TableCell>
                    <TableCell align="center">{typeof row.data.lastPrice === "number" && !Number.isNaN(row.data.lastPrice)? `R$ ${formatPrice(row.data.lastPrice)}`: row.data.lastPrice}</TableCell>
                    <TableCell align="center">{row.data.minStock}</TableCell>
                    <TableCell align="center">{row.data.measurement}</TableCell>
                    <TableCell align="center">{row.data.categoryId}</TableCell>
                    </TableRow>
                </LightTooltip>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
