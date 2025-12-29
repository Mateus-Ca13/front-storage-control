import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCategoryByIdQuery } from "../hooks/useCategoryByIdQuery"
import type { iCategory } from "../../../shared/types/category"
import { Button, Divider, Grid, Typography } from "@mui/material"
import { CardLayout } from "../../../shared/components/Cards/Cards"
import { BetweenFlexBox, CenterColumnBox, CenterFlexBox, EndFlexBox } from "../../../shared/components/Boxes/Boxes"
import CategoryEditForm from "../components/CategoryEditForm/CategoryEditForm"
import ListingTable from "../../../shared/components/ListingTable/ListingTable"
import { persistProductSearchFilter } from "../../../shared/utils/persistSearchFilter"
import { useProductsQuery } from "../../products/hooks/useProductsQuery"
import type { iProductColumnConfig } from "../../../shared/types/product"
import { productsTableColumns } from "../../products/helpers/productsTableColumns"
import { FilterAltRounded } from "@mui/icons-material"
import NotFoundedWarning from "../../../shared/components/NotFoundedWarning/NotFoundedWarning"
import LoadingOverlay from "../../../shared/components/LoadingOverlay/LoadingOverlay"
import { useSettingsStore } from "../../settings/stores/SettingsStore"

export default function CategoryViewPage() {
    const defaultPaginationRows = useSettingsStore((state) => state.defaultPaginationRows);
    const navigate = useNavigate()
    const { id } = useParams()
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginationRows / 2);
    const [products, setProducts] = useState<iProductColumnConfig[]>([])
    const [category, setCategory] = useState<iCategory | null>(null)
    const { data: categoryData, isLoading: categoryIsLoading } = useCategoryByIdQuery(Number(id))
    const { data: productsData,  } = useProductsQuery(page, rowsPerPage, '', {categoriesIds: [category?.id as unknown as string], stockId: undefined, hasNoCodebar: false, isBelowMinStock: false} )
    
    
    useEffect(() => {
        if (categoryData?.data) {
            setCategory(categoryData.data)
            console.log(categoryData.data)
        }
        console.log(category)
        
    }, [categoryData])

    useEffect(() => {
    const products = productsData?.data?.products ?? [];

    setProducts(products);
    }, [productsData]);

    const handleFilterProducts = ()=>{
            persistProductSearchFilter({categoriesIds: [category?.id as unknown as string]})
            navigate('/dashboard/products')
        }

    return (
    categoryData?.success || categoryIsLoading?  
    categoryIsLoading?
    <LoadingOverlay/>:
    
    <Grid container  size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
        <CardLayout sx={{padding: 2, width: '100%'}}>
            <CategoryEditForm category={category}/>
        </CardLayout>
        <Grid size={{xl: 12, lg: 21, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%',justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}} >  
                <BetweenFlexBox flexWrap={'wrap'} mb={2}>
                    <Typography color='primary' fontWeight={700} variant='h5'>Produtos relacionados</Typography>
                    <CenterColumnBox>
                            <Button onClick={handleFilterProducts} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary'>Filtrar produtos com essa categoria<FilterAltRounded/></Button>
                    </CenterColumnBox>
                </BetweenFlexBox>
                <Grid size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} mt={2} container spacing={2}>
                    <ListingTable
                    total={productsData?.data.pagination.total ?? products.length}
                    page={page} setPage={setPage} 
                    rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                    columns={productsTableColumns} items={products} 
                    rowKey={(row: iProductColumnConfig) => row.id} 
                    onRowClick={(some)=> navigate(`/dashboard/products/${some.id}`)}
                    height={385}/>
                </Grid>
                <EndFlexBox width={'100%'} mt={2} border={1} borderColor={'grey.400'} gap={2} display={'inline-block'} px={4} py={1} borderRadius={1} bgcolor={'background.default'} color={'common.black'}>
                    <CenterFlexBox>
                        <Typography variant='body1'>Total de produtos únicos vinculados: <strong>{productsData?.data.pagination.total ?? 0} produto(s)</strong></Typography>
                    </CenterFlexBox>
                </EndFlexBox>
            </CardLayout>
        </Grid>
    </Grid>:
    <NotFoundedWarning/>
    )
}   
