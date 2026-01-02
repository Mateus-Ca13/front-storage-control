import { useNavigate, useParams } from 'react-router-dom'
import { useMovementByIdQuery } from '../hooks/useMovementByIdQuery'
import { Divider, Grid, Typography } from '@mui/material'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { BetweenFlexBox, CenterFlexBox, EndFlexBox } from '../../../shared/components/Boxes/Boxes'
import MovementInfoForm from '../components/MovementInfoForm/MovementInfoForm'
import type { iMovementFull } from '../../../shared/types/movement'
import { useEffect, useState } from 'react'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import { movementsRelationedProductsTableColumns } from '../helpers/movementsTableColumns'
import { formatPrice } from '../../../shared/utils/formatters'
import NotFoundedWarning from '../../../shared/components/NotFoundedWarning/NotFoundedWarning'
import LoadingOverlay from '../../../shared/components/LoadingOverlay/LoadingOverlay'

export default function MovementViewPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [movement, setMovement] = useState<iMovementFull | null>(null)
    const { data: movementData, isLoading: movementIsLoading} = useMovementByIdQuery(Number(id))

    useEffect(() => {
      debugger
        if (movementData?.data) {
            setMovement(movementData.data)
            console.log(movementData.data)
        }

        
        console.log(movement)
        
    }, [movementData])
      
    
  return (
    movementData?.success || movementIsLoading? 
    movementIsLoading?
    <LoadingOverlay/>:
    <Grid container  size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
            <CardLayout sx={{padding: 2, width: '100%'}}>
                <MovementInfoForm movementData={movement}/>
            </CardLayout>
            <Grid size={{xl: 12, lg: 21, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%',justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}} >  
                <BetweenFlexBox  mb={2} flexWrap={'wrap'}>
                    <Typography color='primary' fontWeight={700} variant='h5'>Produtos movimentados</Typography>
                    
                </BetweenFlexBox>
                <Grid size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} mt={2} container spacing={2}>
                    <ListingTable
                    total={movement?.products.length ?? 0}
                    page={0} setPage={()=>{}} 
                    rowsPerPage={100} setRowsPerPage={()=>{}} 
                    columns={movementsRelationedProductsTableColumns}
                    items={movement?.products ?? []}
                    rowKey={(row: iMovementFull['products'][number]) => row.id} 
                    onRowClick={(some)=> navigate(`/dashboard/products/${some.product.id}`)}
                    height={350}
                    noPagination/>
                    <EndFlexBox width={'100%'} marginTop={'auto'} border={1} borderColor={'grey.400'} gap={2} display={'inline-block'} px={4} py={1} borderRadius={1} bgcolor={'background.default'} color={'common.black'}>
                        <CenterFlexBox>
                          <Typography variant='body1'>Total de produtos únicos: <strong>{movement?.products.length} produto(s)</strong></Typography>
                        </CenterFlexBox>
                        <Divider sx={{height: 16, backgroundColor: 'grey.400'}} orientation='vertical' />
                        <CenterFlexBox>
                          <Typography variant='body1'>Total de produtos movimentados: <strong>{movement?.products.reduce((acc, curr) => acc + curr.quantity, 0)} produto(s)</strong></Typography>
                        </CenterFlexBox>
                        <Divider sx={{height: 16, backgroundColor: 'grey.400'}} orientation='vertical' />
                        <CenterFlexBox>
                          <Typography variant='body1'>Valor total de produtos:  <strong>R$ {formatPrice(movement?.products.reduce((acc, curr) => acc + (curr.pricePerUnit * curr.quantity), 0)?? 0)}</strong></Typography>
                        </CenterFlexBox>
                    </EndFlexBox>
                    
                </Grid>
            </CardLayout>
        </Grid>
    </Grid>:
    <NotFoundedWarning/>
        
  )
}
