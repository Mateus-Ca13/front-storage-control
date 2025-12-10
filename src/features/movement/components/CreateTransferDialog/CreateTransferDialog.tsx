import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, Typography } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import {  Controller, useForm } from 'react-hook-form'
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded, SwapHorizontalCircleOutlined } from '@mui/icons-material'
import { BetweenFlexBox, CenterColumnBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { useToastStore } from '../../../../shared/store/toastStore'
import { theme } from '../../../../theme/theme'
import { useMovementStore } from '../../stores/useMovementStore'
import { addProductToMovementSchema, type AddProductToMovementSchema, movementSchema, type MovementSchema } from '../../../../schemas/MovementSchema'
import { createMovementApi } from '../../api/movementsApi'
import { useEffect, useState } from 'react'
import { useStocksQuery } from '../../../stocks/hooks/useStocksQuery'
import type { iStockColumnConfig } from '../../../../shared/types/stock'
import { useProductsQuery } from '../../../products/hooks/useProductsQuery'
import type { iProductColumnConfig, ProductMeasurementType } from '../../../../shared/types/product'
import DialogProductsList from '../DialogProductsList/DialogProductsList'
import { useAuthStore } from '../../../auth/stores/useAuthStore'
import { formatCurrency, formatMeasurementUnit } from '../../../../shared/utils/formatters'


export default function CreateTransferDialog() {

    const userCreator = useAuthStore(state => state.user)
    const renderToast = useToastStore(state => state.renderToast)
    const isCreateModalOpen = useMovementStore(state => state.isTransferModalOpen)
    const closeCreateModal = useMovementStore(state => state.closeTransferModal)
    const [productSearch, setProductSearch] = useState('')
    const [searchedProducts, setSearchedProducts] = useState<iProductColumnConfig[]>([])
    const [productsAddedToMovement, setProductsAddedToMovement] = useState<AddProductToMovementSchema[]>([])

    const {register: registerMovement, 
      control: controlMovement,
      reset: movementResetForm,
      resetField: movementResetField,
      watch: watchMovement,
      handleSubmit: handleSubmitMovement, 
      formState: { errors: errorsMovement, isSubmitting: isSubmittingMovement }, 
      setError: setErrorMovement,
      setValue: setValueMovement } = useForm<MovementSchema>({
      resolver: zodResolver(movementSchema),
      defaultValues: {
      type: 'TRANSFER',
      observations: '',
      products: [],
      userCreatorId:  1
      }
    })

    const {register: registerAddProduct, 
      control: controlAddProduct,
      reset: productResetForm,
      watch: watchAddProduct, 
      handleSubmit: handleAddProductToMovement, 
      formState: { errors: errorsAddProduct, isSubmitting: isSubmittingAddProduct }, 
      setError: setErrorAddProduct,
      setValue: setValueAddProduct,
      resetField: productResetField } = useForm<AddProductToMovementSchema>({
      resolver: zodResolver(addProductToMovementSchema),
        
    })
    const selectedProduct = watchAddProduct('product')
    const stockId = watchMovement('originStockId')
    const {data: stocksData, isLoading: stocksLoading, error: stocksError} = useStocksQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name', type: null})
    const {data: productsData, isLoading: productsLoading, error: productsError } = useProductsQuery(0, 10, productSearch, {orderBy: 'asc', sortBy: 'name', categoriesIds: [], hasNoCodebar: false, isBelowMinStock: false, stockId: stockId?? undefined})
    const [stocks, setStocks] = useState<iStockColumnConfig[]>([])

    useEffect(() => { 
      if (!isCreateModalOpen) { // Reset de fomrulário -  Dialog fechando
        movementResetField('originStockId')
        movementResetField('destinationStockId')
        setProductsAddedToMovement([])
        productResetForm({}, { keepValues: true });
        movementResetForm({}, { keepValues: true });

      }
    }, [isCreateModalOpen, productResetForm, movementResetForm]);

    useEffect(() => { 
      console.log(errorsAddProduct);
      
      console.log(errorsMovement)
      
    }, [errorsAddProduct, errorsMovement])

    useEffect(() => { // Resposta ao estoque selecionado
        console.log(selectedProduct)
        productResetField('product')
        productResetField('quantity')
        productResetField('pricePerUnit')

    }, [stockId])

    useEffect(() => { // Resposta ao produto selecioando 
        setValueAddProduct('pricePerUnit', selectedProduct?.lastPrice?? 0)
        console.log(selectedProduct);
        
    }, [selectedProduct])


    useEffect(() => {
      setValueMovement('products', productsAddedToMovement.map(p => ({ productId: p.product.id, quantity: p.quantity, pricePerUnit: p.pricePerUnit})))
    }, [productsAddedToMovement])
    
    useEffect(() => {
        const stocks = stocksData?.data?.stocks ?? [];
        console.log(stocks)
        setStocks(stocks)
    }, [stocksData]);

    useEffect(() => {
        const products = productsData?.data?.products ?? [];
        setSearchedProducts(products)
    }, [productsData]);

  
    const handleMovementSubmit = async (movementData: MovementSchema) => {
        console.log(movementData)
        const returnedData = await createMovementApi(movementData);
        if (returnedData.success){
            renderToast({message: 'Transferência registrada com sucesso!', type: 'success', })
            console.log('Transferência registrada com sucesso!', returnedData.data)
            closeCreateModal()
        }else{
            renderToast({message: returnedData.message || 'Erro ao registrar transferência', type: 'error', })
        }
    }

    const handleAddProductToMovementSubmit = async (movementData: AddProductToMovementSchema) => {
        console.log(movementData)
        const productAlreadyAdded = productsAddedToMovement.find(p => p.product.id === movementData.product.id)
        if (productAlreadyAdded) {
            renderToast({message: 'Este produto já foi adicionado à movimentação.', type: 'warning', })
            return
        }
        if(selectedProduct.stockedQuantities < movementData.quantity ){
            setErrorAddProduct('quantity', { type: 'required', message: 'Estoque insuficiente.' })
            return
        }
        
        setProductsAddedToMovement([...productsAddedToMovement, movementData])
        productResetField('product')
        productResetField('quantity')
        productResetField('pricePerUnit') 
        setErrorMovement('products', { type: 'required', message: '' })
        
    }

    const handleStockChange = () => {
      if (productsAddedToMovement.length === 0) return;                                   
      renderToast({message: "Estoque alterado. Os produtos vinculados à movimentação foram apagados.", type: "warning"})
      setProductsAddedToMovement([])
    }

  return (
    <Dialog
      maxWidth='lg'
      fullWidth
      open={isCreateModalOpen}
      onClose={closeCreateModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <SwapHorizontalCircleOutlined color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={600} variant='h5'>Registrar transferência</Typography>
              <Typography variant='body2'>Preencha as informações da nova transferência</Typography>
            </StartColumnBox>
          </StartFlexBox>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={2}>
            <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
              <BetweenFlexBox gap={1}>
                <Grid gap={2} container size={{lg: 12, md: 12, sm: 12, xs: 12}}>
                  <Controller
                  name="originStockId"
                  rules={{ required: true }}
                  control={controlMovement}
                  render={({ field }) => (
                  <Autocomplete
                  noOptionsText="Nenhum estoque encontrado."
                  
                    fullWidth
                    options={stocks.map((s)=>({label: s.name, value: s.id}))}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(opt, val) => opt.value === val.value}
                    onChange={(_, value) => {field.onChange(value?.value); handleStockChange() }} // valor real
                    renderInput={(params) =>

                      (<EditingTextField
                      {...params}
                      sx={{ height: '100%'}} 
                      slotProps={{ inputLabel: {shrink: true} }}
                      fullWidth 
                      variant='outlined'
                      label="Estoque de origem" 
                      placeholder='Nome do estoque de origem...'
                      error={!!errorsMovement.originStockId}
                      helperText={errorsMovement.originStockId?.message}
                      />)}
                    />)}
                  />
                  <Controller
                  name="destinationStockId"
                  rules={{ required: true }}
                  control={controlMovement}
                  render={({ field }) => (
                  <Autocomplete
                  noOptionsText="Nenhum estoque encontrado."
                  
                    fullWidth
                    options={stocks.map((s)=>({label: s.name, value: s.id}))}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(opt, val) => opt.value === val.value}
                    onChange={(_, value) => {field.onChange(value?.value) }} // valor real
                    renderInput={(params) =>

                      (<EditingTextField
                      {...params}
                      sx={{ height: '100%'}} 
                      slotProps={{ inputLabel: {shrink: true} }}
                      fullWidth 
                      variant='outlined'
                      label="Estoque de destino" 
                      placeholder='Nome do estoque de destino...'
                      error={!!errorsMovement.originStockId}
                      helperText={errorsMovement.originStockId?.message}
                      />)}
                    />)}
                  />
                  <EditingTextField
                  {...registerMovement("observations")}
                  sx={{ height: '100%'}} 
                  slotProps={{ inputLabel: {shrink: true} }}
                  fullWidth 
                  variant='outlined'
                  label="Observações" 
                  placeholder='Observações relevantes...'
                  multiline
                  rows={4}
                  error={!!errorsMovement.observations}
                  helperText={errorsMovement.observations?.message}
                  />
                  <CenterColumnBox sx={{gap: 2, width: '100%'}}>
                    <Typography fontWeight={600} variant='h6'>Adicionar Itens</Typography>
                    <Controller
                      name="product"
                      control={controlAddProduct}
                      render={({ field }) => (
                        <Autocomplete
                          fullWidth
                          noOptionsText={stockId? "Nenhum produto encontrado.": "Selecione um estoque de origem."}
                          options={stockId ? searchedProducts.map((s) => ({
                            id: s.id,
                            name: s.name,
                            codebar: s.codebar,
                            measurement: s.measurement,
                            stockedQuantities: Number(s.stockedQuantities),
                            lastPrice: Number(s.lastPrice)
                          })): []}
                          getOptionLabel={(option) => option?.name ? `${option?.name} — ${option.stockedQuantities} ${formatMeasurementUnit(option.measurement as ProductMeasurementType, 'plural')} restantes`: ""}
                          renderOption={(props, option) => (
                            <li {...props} style={{gap: 2}}>
                            <Typography color='textPrimary' >{option.name}</Typography>
                            <Typography color='textSecondary'>—</Typography>
                            <Typography color='secondary'>{option.stockedQuantities} {formatMeasurementUnit(option.measurement as ProductMeasurementType, 'plural')} restantes</Typography>
                            </li>
                        )}
                          isOptionEqualToValue={(opt, val) => opt.id === val.id}
                          value={field.value || null || undefined}
                          onChange={(event, selectedOption) => field.onChange(selectedOption)}
                          renderInput={(params) => (
                            <EditingTextField
                              {...params}
                              slotProps={{ inputLabel: {shrink: true} }}
                              fullWidth
                              variant="outlined"
                              label="Produto"
                              placeholder="Nome do produto..."
                              onChange={(e) => setProductSearch(e.target.value)}
                              onBlur={() => setProductSearch("")}
                              error={!!errorsAddProduct.product}
                              helperText={errorsAddProduct.product?.message}
                            />
                          )}
                        />
                      )}
                    />
                    <StartFlexBox sx={{width: '100%' }} gap={2}>
                        <EditingTextField
                        sx={{ height: '100%'}} 
                        slotProps={{ inputLabel: {shrink: true} }}
                        fullWidth 
                        {...registerAddProduct("quantity", {
                            valueAsNumber: true,
                            validate: (quantity, product) => {
                            if (isNaN(quantity)) return "Quantidade inválida.";
                            if (quantity > product.product.stockedQuantities) {
                                return `A quantidade excede o estoque disponível (${product.product.stockedQuantities}).`;
                            }
                            return true;
                            }
                        })}

                        error={!!errorsAddProduct.quantity}
                        helperText={errorsAddProduct.quantity?.message}
                        type='number'
                        variant='outlined'
                        label="Quantidade" 
                        placeholder='Quantidade...'
                        defaultValue={0}
                        />
                        
                        <Controller
                        name="pricePerUnit"
                        control={controlAddProduct}
                        rules={{ required: "Campo obrigatório" }}
                        render={({ field }) => (
                          <EditingTextField
                          disabled
                            fullWidth
                            label={'Preço unitário'}
                            slotProps={{
                              input: { startAdornment: <InputAdornment position="start">R$</InputAdornment> },
                            }}
                            error={!!errorsAddProduct.pricePerUnit}
                            helperText={errorsAddProduct.pricePerUnit?.message}
                            value={formatCurrency(field.value?.toString() ?? '')}
                            onChange={(e) => {
                              const raw = e.target.value;
                              const numeric = raw.replace(/\D/g, "");
                              const value = Number(numeric) / 100;
                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </StartFlexBox> 

                  </CenterColumnBox>
                  <Button 
                  sx={{py: 2, gap: 1}} 
                  fullWidth 
                  variant='contained' 
                  onClick={handleAddProductToMovement(handleAddProductToMovementSubmit)}>
                    Adicionar produto
                    <AddCircleOutlineRounded fontSize='small'/>
                    </Button>
                </Grid>
                <Divider sx={{ bgcolor: theme.palette.primary.light}}  orientation="vertical"/>
              </BetweenFlexBox>
            </Grid>
              <Grid size={{lg: 8, md: 8, sm: 12, xs: 12}}>
                <DialogProductsList errorMessage={errorsMovement.products?.message} products={productsAddedToMovement} setProducts={setProductsAddedToMovement}/>
               
            </Grid>
          </Grid>
          {errorsMovement.root && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorsMovement.root.message}
          </Typography>
          )}
          {errorsAddProduct.root && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errorsAddProduct.root.message}
          </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{padding: 2}}>
          <Button onClick={closeCreateModal} sx={{px: 4, py: 1}} variant='outlined'>Cancelar</Button>
          <Button onClick={handleSubmitMovement(handleMovementSubmit)} sx={{px: 4, py: 1}} variant='contained'>Registrar transferência</Button>
        </DialogActions>
      </Dialog>
  )
}
