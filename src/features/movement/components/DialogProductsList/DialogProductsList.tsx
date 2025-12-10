import React from 'react'
import type { AddProductToMovementSchema } from '../../../../schemas/MovementSchema'
import { BetweenFlexBox, EndFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Divider, Typography } from '@mui/material'
import { formatPrice } from '../../../../shared/utils/formatters'
import ListingTable from '../../../../shared/components/ListingTable/ListingTable'
import { minimizedProductMovementsTableColumns } from '../../../products/helpers/productsTableColumns'
import type { iProductAddedToMovementColumnConfig } from '../../../../shared/types/product'

type DialogProductsListProps = {
    products: AddProductToMovementSchema[]
    setProducts: React.Dispatch<React.SetStateAction<AddProductToMovementSchema[]>>
    errorMessage?: string
}

export default function DialogProductsList({ products, setProducts, errorMessage }: DialogProductsListProps) {
  return (
        <StartColumnBox  mb={3}>
            <BetweenFlexBox sx={{width: '100%'}} bgcolor={'secondary.light'} px={2} py={1} mb={3} borderRadius={1}>
                <Typography fontWeight={600}  variant='h6' >Produtos adicionados</Typography>
                <Typography variant='body2' color={'error.main'}>{errorMessage ? errorMessage : ''}</Typography>
            </BetweenFlexBox>

            <ListingTable
            total={products.length}
            page={0} setPage={()=>{}} 
            height={450}
            rowsPerPage={0} setRowsPerPage={()=>{}} 
            columns={minimizedProductMovementsTableColumns} items={products.map(product => ({
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
            noRowsText='Sem produtos adicionados.'
            />
            <EndFlexBox sx={{width: '100%', mt: 2}} bgcolor={'secondary.light'} px={2} gap={2} py={1} mb={2} borderRadius={1}>
                <Typography variant='body1' color={'text.primary'}>Total de produtos únicos: <strong>{products.length}</strong></Typography>
                <Divider orientation='vertical' sx={{height: 22}}/>
                <Typography variant='body1' color={'text.primary'}>Total de produtos: <strong>{products.reduce((acc, product) => acc + product.quantity, 0)}</strong></Typography>
                <Divider orientation='vertical' sx={{height: 22}}/>
                <Typography variant='body1' color={'text.primary'}>Valor total: <strong>R$ {formatPrice(products.reduce((acc, product) => acc + (product.pricePerUnit * product.quantity), 0))}</strong></Typography>
            </EndFlexBox>
        </StartColumnBox>
    )
}