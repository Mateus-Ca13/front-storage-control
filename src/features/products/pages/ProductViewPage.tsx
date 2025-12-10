import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductByIdQuery } from '../hooks/useProductByIdQuery'
import type { iProduct } from '../../../shared/types/product'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { Divider, Grid, Typography } from '@mui/material'
import ProductEditForm from '../components/ProductEditForm/ProductEditForm'
import { CenterFlexBox, EndFlexBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { Category, InfoOutlineRounded, SyncAltOutlined, Warning } from '@mui/icons-material'
import { formatMeasurementUnit } from '../../../shared/utils/formatters'
import { TwoColorsChip } from '../../../shared/components/Chips/Chips'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import { productMovementsTableColumns, minimizedProductsTableColumns } from '../helpers/productsTableColumns'

export default function ProductViewPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [product, setProduct] = useState<iProduct | null>(null)
    const { data: productData } = useProductByIdQuery(Number(id))
    
    useEffect(() => {
        if (productData?.data) {
            setProduct(productData.data)
            console.log(productData.data)
        }
        console.log(product)
        
    }, [productData])



  return (
     <Grid container  size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
            <CardLayout sx={{padding: 2, width: '100%'}}>
                <ProductEditForm product={product}/>
            </CardLayout>
            <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%',justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}} >  
                <StartFlexBox flexWrap={'wrap'} columnGap={2} rowGap={1}  mb={2}>
                    <Typography color='primary' fontWeight={700} variant='h5'>Quantidade em estoque</Typography>
                    {product?.isBelowMinStock &&
                    <TwoColorsChip 
                    colorPreset='error' 
                    label={
                        <CenterFlexBox gap={1}>
                        <Typography color='error' fontWeight={500} variant='body2'>
                            Produto abaixo do estoque mínimo 
                            </Typography>
                        <Warning color='error' sx={{fontSize: 16}}/>
                        </CenterFlexBox>
                    }
                    />
                    }
                </StartFlexBox>
                <Grid size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} mt={2} container spacing={2} >
                    <ListingTable
                    noPagination
                    total={product?.stockedQuantities!.length ?? 0}
                    page={0} setPage={()=>{}} 
                    rowsPerPage={100} setRowsPerPage={()=>{}} 
                    columns={minimizedProductsTableColumns} 
                    items={product?.stockedQuantities! ? product?.stockedQuantities.map(sq => ({...sq, quantity: `${sq.quantity} (${product.measurement})`})) : []} 
                    rowKey={(row) => row.stock.id} 
                    height={210}
                    onRowClick={(some)=> navigate(`/dashboard/stocks/${some.stock.id}`)}
                    />
                </Grid>
                <EndFlexBox border={1} borderColor={'grey.400'} gap={2} mt={2} display={'inline-block'} px={2} py={1} borderRadius={1} bgcolor={'background.default'} color={'common.black'}>
                    <Typography variant='body1'>Presente em: <strong>{product?.stockedQuantities?.length ?? 0} Estoque(s)</strong></Typography> 
                    <Divider sx={{height: 16, backgroundColor: 'grey.400'}} orientation='vertical' />
                    <Typography variant='body1'>Quantidade total estocada: <strong>{Number(product?.stockedQuantities!.reduce((acc, curr) => acc + curr.quantity, 0))} {formatMeasurementUnit(product?.measurement?? 'UN', 'plural')}</strong></Typography>
                </EndFlexBox>
            </CardLayout>
            </Grid>
            <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%', justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}}>
                <Typography color='primary' fontWeight={700} variant='h5'>Últimas movimentações</Typography>
                <Grid size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} mt={4} container spacing={2}>
                    <ListingTable
                    noPagination
                    total={product?.movements!.length ?? 0}
                    page={0} setPage={()=>{}} 
                    rowsPerPage={100} setRowsPerPage={()=>{}} 
                    columns={productMovementsTableColumns} 
                    items={product?.movements! ? product?.movements.map(mov => ({...mov, quantity: `${mov.quantity} (${product.measurement})`})) : []} 
                    rowKey={(row) => row.id} 
                    height={210}
                    onRowClick={(some)=> navigate(`/dashboard/movements/${some.movementBatch.id}`)}
                    />
                </Grid>
                <EndFlexBox border={1} mt={2} borderColor={'grey.400'} gap={1} display={'inline-block'} px={2} py={1} borderRadius={1} bgcolor={'background.default'} color={'common.black'}>
                    <Typography variant='body1'>Quantidade movimentada recentemente:  <strong>{Number(product?.movements!.reduce((acc, curr) => acc + Number(curr.quantity), 0))} {formatMeasurementUnit(product?.measurement?? 'UN', 'plural')}</strong></Typography>
                </EndFlexBox>
            </CardLayout>
        </Grid>
    </Grid>
  )
}
