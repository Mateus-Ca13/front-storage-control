import React from 'react'
import type { AddProductToMovementSchema } from '../../../../schemas/MovementSchema'
import { EndFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Divider, Typography, useTheme } from '@mui/material'
import { formatPrice } from '../../../../shared/utils/formatters'
import ListingTable from '../../../../shared/components/ListingTable/ListingTable'
import { withdrawalProductMovementsTableColumns } from '../../../products/helpers/productsTableColumns'
import type { iProductAddedToMovementColumnConfig } from '../../../../shared/types/product'

type WithdrawalProductsListProps = {
    products: AddProductToMovementSchema[]
    setProducts: React.Dispatch<React.SetStateAction<AddProductToMovementSchema[]>>
    errorMessage?: string
}

export default function WithdrawalProductsList({ products, setProducts }: WithdrawalProductsListProps) {

    const theme = useTheme()
  return (
        <StartColumnBox sx={{width: '100%'}}>

            <ListingTable
            autoRoll
            biggerText
            total={products.length}
            page={0} setPage={()=>{}} 
            height={450}
            rowsPerPage={0} setRowsPerPage={()=>{}} 
            columns={withdrawalProductMovementsTableColumns} items={products.map(product => ({
                id: product.product.id,
                codebar: product.product.codebar,
                quantity: product.quantity,
                pricePerUnit: product.pricePerUnit,
                name: product.product.name,
                measurement: product.product.measurement,
                totalPrice: product.pricePerUnit * product.quantity,
                excludeAction: () => {
                    setProducts(products.filter(p => p.product.id !== product.product.id))
                }
            })
            ) as iProductAddedToMovementColumnConfig[]} 
            rowKey={(row: iProductAddedToMovementColumnConfig) => row.id} 
            onRowClick={(some)=> console.log(some)}
            noPagination
            noRowsText=''
            />
            <EndFlexBox sx={{width: '100%', mt: 2, border: `1px solid ${theme.palette.secondary.main}`}} bgcolor={'secondary.light'} px={2} gap={2} py={1} mb={2} borderRadius={1}>
                <Typography variant='h6' color={'text.primary'}>Total de produtos únicos: <strong>{products.length}</strong></Typography>
                <Divider orientation='vertical' flexItem/>
                <Typography variant='h6' color={'text.primary'}>Total de produtos: <strong>{products.reduce((acc, product) => acc + product.quantity, 0)}</strong></Typography>
                <Divider orientation='vertical' flexItem/>
                <Typography variant='h6' color={'text.primary'}>Valor total: <strong>R$ {formatPrice(products.reduce((acc, product) => acc + (product.pricePerUnit * product.quantity), 0))}</strong></Typography>
            </EndFlexBox>
        </StartColumnBox>
    )
}