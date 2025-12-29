import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import { CenterColumnBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { ClearRounded, DownloadRounded, UploadRounded} from '@mui/icons-material'
import { useProductStore } from '../../stores/useProductStore'
import {  useRef, useState } from 'react'
import { createProductsListApi, getProductsCsvConvertToJson } from '../../api/productsApi'
import { useToastStore } from '../../../../shared/store/toastStore'
import type { iProductsImportCsvReturn } from '../../../../shared/types/product'
import ImportProductsList from './ImportProductsList/ImportProductsList'

export default function ImportProductsDialog() {
    
    const theme = useTheme()
    const renderToast = useToastStore(state => state.renderToast)
    const isImportProductsModalOpen = useProductStore(state => state.isImportProductsModalOpen)
    const closeImportProductModal = useProductStore(state => state.closeImportProductModal)
    const csvFileInputRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [importedProducts, setImportedProducts] = useState<iProductsImportCsvReturn[]>([])
    const [hasErrors, setHasErrors] = useState<boolean>(false)


    const handleUploadSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const selectedFile = event.target.files?.[0]

        if (!selectedFile) {
        return;
        }

        setSelectedFile(selectedFile || null);
        const returnedData = await getProductsCsvConvertToJson(selectedFile)

        if (!returnedData.success) {
            renderToast({
                message: returnedData.message,
                type: 'error'
            })
            return
        }

        if (csvFileInputRef.current) {
            csvFileInputRef.current.value = '';
        }
        
        console.log('Importação concluída com sucesso:', returnedData);

        if (returnedData.data.some(p => p.success === false)) {
            setHasErrors(true)
            renderToast({
                message: 'Alguns produtos possuem irregularidades. Verifique a lista para mais detalhes.',
                type: 'error',
            })
        }else{
            setHasErrors(false)
        }
        
        setImportedProducts(returnedData.data)
    };

    const downloadProductsTemplate = () => {
    const csv = "Nome do produto;Código de barras;Descrição;Último preço pago;Estoque mínimo;Unidade de medida (KG, UN, L, M);ID da categoria\n";

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "template_produtos.csv";
    a.click();
    a.remove();
    };

    const handleCloseDialog = () => {
        closeImportProductModal()
        setImportedProducts([])
        setSelectedFile(null)
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        setImportedProducts([])
    }

    const handleProductsSubmit = async () => {
        const productsList = importedProducts.map(p => p.data)
       const products = await createProductsListApi(productsList)

       if (!products.success) {
        renderToast({
            message: products.message,
            type: 'error'
        })
        return
       }

       renderToast({
        message: 'Produtos importados com sucesso!',
        type: 'success'
       })


       handleCloseDialog()
       console.log(products)
    }



    return (
        <Dialog
            open={isImportProductsModalOpen}
            maxWidth="lg"
            fullWidth
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            <StartFlexBox gap={1}>
                <UploadRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                <Typography fontWeight={700} variant='h5'>Importar lista de produtos</Typography>
                <Typography variant='body2'>Cadastre listas de produtos através de um arquivo <strong>csv</strong>.</Typography>
                </StartColumnBox>
            </StartFlexBox>
            </DialogTitle>
            <DialogContent >
                <CenterColumnBox gap={1} mt={2} width={'100%'}>
                    <Button sx={{textTransform: 'none', p:1.5}} fullWidth variant="outlined" component="span"onClick={downloadProductsTemplate}>
                        <Typography>Baixar arquivo modelo</Typography>
                        <DownloadRounded sx={{ml:1}}/>
                    </Button>
                    <CenterColumnBox width={'100%'}>
                        <input
                            ref={csvFileInputRef}
                            hidden
                            accept=".csv"
                            id="file-input"
                            type="file"
                            onChange={(e) => handleUploadSubmit(e as React.ChangeEvent<HTMLInputElement>)}
                        />
                            {!selectedFile ? 
                            <Button onClick={() => csvFileInputRef.current?.click()} sx={{textTransform: 'none', p:1.5}} fullWidth variant="contained" component="span">
                                <Typography>Importar arquivo CSV</Typography>
                                <UploadRounded sx={{ml:1}}/>
                            </Button>:
                            <Button onClick={() => handleRemoveFile()} sx={{textTransform: 'none', p:1.5}} fullWidth variant="contained" component="span">
                                <Typography>{selectedFile?.name}</Typography>
                                <ClearRounded sx={{ml:1}}/>
                            </Button>
                            }
                            
                    </CenterColumnBox>
                </CenterColumnBox>
                <CenterColumnBox height={400} overflow={'auto'}  sx={{backgroundColor: 'grey.300', my: 3, borderRadius: 2, justifyContent: 'start', border: `1px solid ${theme.palette.grey[300]}`}}>
                    {importedProducts.length === 0? <Typography color='grey.500' mt={22}>Sem produtos importados</Typography>:
                        <ImportProductsList importedProducts={importedProducts} />
                    }
                </CenterColumnBox>
            </DialogContent>
            <DialogActions sx={{padding: 2}}>
                <Button onClick={handleCloseDialog} sx={{px: 4, py: 1}} variant='outlined' >Cancelar</Button>
                <Button onClick={()=>handleProductsSubmit()} sx={{px: 4, py: 1}} variant='contained' disabled={hasErrors || importedProducts.length === 0}>Importar produtos</Button>
            </DialogActions>
        </Dialog>
                

    )
}
