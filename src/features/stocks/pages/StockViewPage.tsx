import { useEffect, useState } from "react"
import type { iStock } from "../../../shared/types/stock"
import { useNavigate, useParams } from "react-router-dom"
import { useStockByIdQuery } from "../hooks/useStockByIdQuery"
import type { iProductColumnConfig } from "../../../shared/types/product"
import { useProductsQuery } from "../../products/hooks/useProductsQuery"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { CardLayout } from "../../../shared/components/Cards/Cards"
import StockEditForm from "../components/StockEditForm/StockEditForm"
import { BetweenFlexBox, CenterColumnBox, EndFlexBox} from "../../../shared/components/Boxes/Boxes"
import ListingTable from "../../../shared/components/ListingTable/ListingTable"
import { productsTableColumns } from "../../products/helpers/productsTableColumns"
import { persistProductSearchFilter } from "../../../shared/utils/persistSearchFilter"
import { FilterAltRounded } from "@mui/icons-material"
import NotFoundedWarning from "../../../shared/components/NotFoundedWarning/NotFoundedWarning"
import LoadingOverlay from "../../../shared/components/LoadingOverlay/LoadingOverlay"
import { useSettingsStore } from "../../settings/stores/SettingsStore"


export default function StockViewPage() {
    const defaultPaginationRows = useSettingsStore((state) => state.defaultPaginationRows);
    const navigate = useNavigate()
    const { id } = useParams()
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginationRows / 2);
    const [products, setProducts] = useState<iProductColumnConfig[]>([])
    const [stock, setStock] = useState<iStock | null>(null)
    const { data: stockData, isLoading: stockIsLoading} = useStockByIdQuery(Number(id))
    const { data: productsData,  } = useProductsQuery(page, rowsPerPage, '', {categoriesIds: [], stockId: stock?.id, hasNoCodebar: false, isBelowMinStock: false} )


    useEffect(() => {
    const products = productsData?.data?.products ?? [];

    setProducts(products);
  }, [productsData]);

    useEffect(() => {
        if (stockData) {
            setStock(stockData.data)
            console.log(stockData.data)
        }
        console.log(stock)
        
    }, [stockData])

    const handleFilterProducts = ()=>{
        persistProductSearchFilter({stockId: stock?.id})
        navigate('/dashboard/products')
    }

  return (
    stockData?.success || stockIsLoading?
    stockIsLoading?
    <LoadingOverlay/>:
    <Grid container size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
        <CardLayout sx={{padding: 2, width: '100%'}}>
                <StockEditForm stock={stock}/>
        </CardLayout>
        <Grid size={{xl: 12, lg: 21, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%',justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}} >  
                <BetweenFlexBox flexWrap={'wrap'}>
                    <Typography color='primary' fontWeight={700} variant='h5'>Produtos nesse estoque</Typography>
                    <CenterColumnBox>
                            <Button onClick={handleFilterProducts} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary'>Filtrar produtos deste estoque<FilterAltRounded/></Button>
                    </CenterColumnBox>
                </BetweenFlexBox>
                <Grid size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} mt={4} container spacing={2}>
                    <ListingTable
                    total={productsData?.data.pagination.total ?? products.length}
                    page={page} setPage={setPage} 
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                    columns={productsTableColumns} items={products} 
                    rowKey={(row: iProductColumnConfig) => row.id} 
                    onRowClick={(some)=>navigate(`/dashboard/products/${some.id}`)}
                    height={385}/>
                </Grid>
                <EndFlexBox width={'100%'} mt={2} border={1} borderColor={'grey.400'} gap={2} display={'inline-block'} px={2} py={1} borderRadius={1} bgcolor={'background.default'} color={'common.black'}>
                    <Typography variant='body1'>Total de produtos únicos: <strong>{productsData?.data.pagination.total ?? 0} produto(s)</strong></Typography> 
                    <Divider sx={{height: 16, backgroundColor: 'grey.400'}} orientation='vertical' />
                    <Typography variant='body1'>Total de produtos em estoque: <strong>{stock?.stockedQuantities} produto(s)</strong></Typography>
                </EndFlexBox>
            </CardLayout>
            
        </Grid>
    </Grid>:
    <NotFoundedWarning/>
  )
}
