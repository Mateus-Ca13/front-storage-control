import { useForm, type Control, type FieldErrors, type UseFormGetValues, type UseFormSetValue, type UseFormTrigger } from "react-hook-form";
import { addProductToMovementSchema, type AddProductToMovementSchema, type MovementSchema } from "../../../../schemas/MovementSchema";
import { Button, Divider, Typography, useTheme } from "@mui/material";
import { EditingTextField } from "../../../../shared/components/TextField/TextField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type BaseSyntheticEvent } from "react";
import { useToastStore } from "../../../../shared/store/toastStore";
import type { iProduct } from "../../../../shared/types/product";
import { useKeyboardShortcuts } from "../../../../shared/hooks/useKeyboardShortcuts";
import { SearchRounded } from "@mui/icons-material";
import { BetweenFlexBox, CenterColumnBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import { TwoColorsChip } from "../../../../shared/components/Chips/Chips";
import { formatMovementType } from "../../../../shared/utils/formatters";
import WithdrawalProductsList from "../WithdrawalProductsList/WithdrawalProductsList";
import type { iStockColumnConfig } from "../../../../shared/types/stock";
import { useStocksQuery } from "../../../stocks/hooks/useStocksQuery";
import { useMovementStore } from "../../../movement/stores/useMovementStore";
import ProductQuantityDialog from "../ProductQuantityDialog/ProductQuantityDialog";
import { getProductByCodebar } from "../../../products/api/productsApi";

import { useShortcutContextStore } from "../../../../shared/store/keyboardShortcutsStore";
import { CardLayout } from "../../../../shared/components/Cards/Cards";
import { useConfirmActionDialogStore } from "../../../../shared/store/confirmActionDialogStore";
import ObservationsDialog from "../ObservationsDialog/ObservationsDialog";


type AddProductHistoryStackProps = {
  productId: number;
  quantity: number;
}


type WithdrawalInterfaceProps = {
  formValueSetter: UseFormSetValue<MovementSchema>;
      formValueGetter: UseFormGetValues<MovementSchema>;
      formStepSetter: React.Dispatch<React.SetStateAction<"operationType" | "usedStocks" | "withdrawal">>
      formControl: Control<MovementSchema>
      formErrors: FieldErrors<MovementSchema>
      formTrigger: UseFormTrigger<MovementSchema>
      onSubmitMovement: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>
}


export default function WithdrawalInterface({formStepSetter, formValueGetter, formValueSetter, formTrigger, formControl, formErrors, onSubmitMovement }: WithdrawalInterfaceProps) {

  const theme = useTheme()
  const renderToast = useToastStore(state => state.renderToast)
  const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog)
  const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
  const openProductQuantityModelDialog = useMovementStore(state => state.openProductQuantityModal)
  const [productsAddedToMovement, setProductsAddedToMovement] = useState<AddProductToMovementSchema[]>([])
  const codebarInputRef = useRef<HTMLInputElement>(null)
  const [productSearch, setProductSearch] = useState('')
  const [searchedProduct, setSearchedProduct] = useState<iProduct | null>(null)
  const [stocks, setStocks] = useState<iStockColumnConfig[]>([])
  const isQuantityModalOpen = useMovementStore(state => state.isProductQuantityModalOpen)
  const isObservationModalOpen = useMovementStore(state => state.isObservationModalOpen)
  const openObservationModal = useMovementStore(state => state.openObservationModal)
  const [addProductHistoryStack, setAddProductHistoryStack] = useState<AddProductHistoryStackProps[]>([])

  const {
    register: registerAddProduct, 
    control: controlAddProduct,
    reset: productResetForm,
    watch: watchAddProduct, 
    handleSubmit: handleAddProductToMovement, 
    formState: { errors: errorsAddProduct, isSubmitting: isSubmittingAddProduct }, 
    setError: setErrorAddProduct,
    setValue: setValueAddProduct,
    getValues: getValuesAddProduct,
    trigger: triggerAddProduct,
    resetField: productResetField } = useForm<AddProductToMovementSchema>({
    resolver: zodResolver(addProductToMovementSchema),
    defaultValues: {
        quantity: 1,
    }
    })

    useKeyboardShortcuts({
      'Enter': async () => {
        setProductSearch(codebarInputRef.current?.value as string)
        handleProductFetchResult();
      },
      'Tab': ()=> {
        codebarInputRef.current?.focus();
      },
      'F1': () => {
        openProductQuantityModelDialog()
      },
      'F2': () => {
        openObservationModal()
      },
      'F3': () => {
        handleMovementSubmit()
      },
      'Escape': () => {
      },
      'F10': () => {
        cancelMovement()
      },
      'F6': () => {
        removeLastAddedProductFromHistory()
      },
      'F4': () => {
        renderConfirmActionDialog({
          title: 'Alterar estoques?',
          message: 'Você tem certeza que deseja alterar os estoques de origem e/ou destino? Todos os produtos adicionados serão removidos.',
          confirmAction: {label: 'Alterar estoques [ENTER]', onClick: () => {
            formStepSetter('usedStocks')
            formValueSetter('products', [])
            closeConfirmActionDialog()
          }},
          cancelAction: {label: 'Voltar [ESC]', onClick: () => {
            closeConfirmActionDialog()
          }}
        })
      }
    }, 1)
  
    const {data: stocksData, isLoading: stocksLoading, error: stocksError} = useStocksQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name', type: null})
    const selectedProductQuantity = watchAddProduct('quantity')

  const handleAddProductToMovementSubmit = async (movementData: AddProductToMovementSchema) => {
  console.log(movementData)
  const productAlreadyAdded = productsAddedToMovement.find(p => p.product.id === movementData.product.id)

  if (productAlreadyAdded) {

      if((productAlreadyAdded.quantity + movementData.quantity) > movementData.product.stockedQuantities ){
          renderToast({message: `Estoque insuficiente para adicionar o produto. A quantidade em estoque é de ${movementData.product.stockedQuantities} (${movementData.product.measurement})`, type: 'error'})
          setErrorAddProduct('quantity', { type: 'required', message: 'Estoque insuficiente.' })
          return
      }
      productAlreadyAdded.quantity += movementData.quantity
      setProductsAddedToMovement([...productsAddedToMovement.filter(p => p.product.id !== movementData.product.id), productAlreadyAdded])
  }else{
    if(movementData.quantity > movementData.product.stockedQuantities){
      renderToast({message: 'Estoque insuficiente para adicionar o produto.', type: 'error'})
      setErrorAddProduct('quantity', { type: 'required', message: 'Estoque insuficiente.' })
      return
    }
    setProductsAddedToMovement([...productsAddedToMovement, movementData])
  }
  
  setAddProductHistoryStack([...addProductHistoryStack, {productId: movementData.product.id, quantity: movementData.quantity}])
  productResetField('product')
  productResetField('quantity')
  productResetField('pricePerUnit') 
  return; 
  }

  const handleProductFetchResult = async () => {
    
    if (!productSearch || productSearch.length < 1) {
      renderToast({
        message: "Insira um código de barras válido.",
        type: "error"
      });
      return;
    };

    const productData  = await getProductByCodebar(productSearch, formValueGetter('originStockId') as number);

    if (!productData) return;

    if (productData.success) {
      const product = productData.data;
      setSearchedProduct(product);

      setValueAddProduct('product', {
        id: product.id,
        codebar: product.codebar,
        name: product.name,
        measurement:  product.measurement,
        lastPrice: product.lastPrice,
        stockedQuantities: product.stockedQuantities?.[0]?.quantity ?? 0 //Sempre será o index 0 pois buscamos o produto já filtrando pelo estoque de origem
        
        });
      setValueAddProduct('pricePerUnit', product.lastPrice ?? 0);

      const isValid = await triggerAddProduct();

      if(isValid) {
        handleAddProductToMovementSubmit(getValuesAddProduct());
      } else {
        renderToast({
          message: "Produto inválido, verifique os campos.",
          type: "error"
        });
        return
      }

      if (codebarInputRef.current) {
        setProductSearch("");
      }

    } else {
      renderToast({
        message: productData.message ?? "Produto não encontrado para o código de barras informado.",
        type: "error"
      });
    }
  };

  const removeLastAddedProductFromHistory = () => {
    const historyStack = [...addProductHistoryStack];
    const lastAdded = historyStack.pop();
    if (!lastAdded) return;

    setAddProductHistoryStack(historyStack);
    const addedProduct = productsAddedToMovement.filter(p => p.product.id === lastAdded.productId)[0];
    if (addedProduct) {
      if(lastAdded.quantity >= addedProduct.quantity){
        setProductsAddedToMovement(productsAddedToMovement.filter(p => p.product.id !== lastAdded.productId));  
      } else {
        addedProduct.quantity -= lastAdded.quantity;
        setProductsAddedToMovement([...productsAddedToMovement.filter(p => p.product.id !== lastAdded.productId), addedProduct]);
      }
      renderToast({message: `Última adição removida: ${addedProduct.product.name} (x${lastAdded.quantity})`, type: 'info' });
    }
  }

  const cancelMovement = () => {
    renderConfirmActionDialog({
      title: 'Cancelar movimentação?',
      message: 'Você tem certeza que deseja cancelar esta movimentação? A movimentação atual será perdida.',
      confirmAction: {label: 'Confirmar [ENTER]', onClick: () => {
          formStepSetter('operationType')
          setProductsAddedToMovement([])
          productResetForm()
          setAddProductHistoryStack([])
          closeConfirmActionDialog()
      }},
      cancelAction: {label: 'Voltar [ESC]', onClick: () => {
          closeConfirmActionDialog()
      }}
    })
  }

  const handleMovementSubmit = () => {
    renderConfirmActionDialog({
      title: 'Concluir movimentação?',
      message: 'Você tem certeza que deseja concluir esta movimentação?',
      confirmAction: {label: 'Concluir [ENTER]', onClick: async () => {
          closeConfirmActionDialog()
          if(onSubmitMovement){
            await onSubmitMovement();
          }
      }},
      cancelAction: {label: 'Voltar [ESC]', onClick: () => {
          closeConfirmActionDialog()
      }}
    })
  }   

  useEffect(() => {
    formValueSetter('products', productsAddedToMovement.map(p => ({ productId: p.product.id, quantity: p.quantity, pricePerUnit: p.pricePerUnit})))
    setValueAddProduct('quantity', 1)
  }, [productsAddedToMovement])

  useEffect(() => {
      const stocks = stocksData?.data?.stocks ?? [];
      console.log(stocks)
      setStocks(stocks)
  }, [stocksData]);

  useEffect(() => {
    const input = codebarInputRef.current;
    if (!input) return;
    
    const enforceFocus = () => {
      const stack = useShortcutContextStore.getState().contextStack;
      const isMainContextActive = stack.length == 1; 

      if (isMainContextActive) {
        setTimeout(() => input.focus(), 0);
      }
    };

    input.addEventListener("blur", enforceFocus);
    input.focus();

    return () => input.removeEventListener("blur", enforceFocus);
  }, []);

  

  return (
      <BetweenFlexBox height={'100%'}  gap={4} width={'100%'} alignItems={'start'} justifyContent={'space-between'}>
        <CenterColumnBox  width={'70%'} >
        <EditingTextField
          {...registerAddProduct('product.id')}
          inputRef={codebarInputRef}
          slotProps={{ inputLabel: {shrink: true}, input: { endAdornment: <CenterFlexBox color={'secondary.main'} gap={1}><SearchRounded fontSize="large"/><Typography mb={0.25} fontWeight={500}>[ENTER]</Typography></CenterFlexBox> } }}
          fullWidth
          focused
          sx={{
            height: '100%',
            "& .MuiInputBase-input": {
            fontSize: "1.5rem",      // tamanho do texto digitado
            },
            "& .MuiFormHelperText-root": {
            fontSize: "1rem",     // helper/error
            },
          }}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setProductSearch(value);
          }}
          variant="outlined"
          value={productSearch}
          label="Código de barras do produto"
          placeholder="Código de barras do produto..."
          onBlur={() => {setProductSearch("")}}
          error={!!errorsAddProduct.product}
          helperText={errorsAddProduct.product?.message}
        />
        <StartColumnBox mt={2} gap={2} height={'100%'}>
          <CenterFlexBox gap={1} onClick={openProductQuantityModelDialog} sx={{cursor: 'pointer'}}>
            <Typography color='primary' fontWeight={700} variant='h6'>Quantidade:</Typography>
            <TwoColorsChip label={selectedProductQuantity} sx={{fontWeight: 700}} colorPreset="secondary" />
            <Typography color='primary' marginLeft={1} variant='body1' fontWeight={500}>[F1] para alternar</Typography>
          </CenterFlexBox>

          <Divider sx={{ bgcolor: theme.palette.secondary.light, width: '100%'}} />
          <WithdrawalProductsList errorMessage={formErrors.products?.message} products={productsAddedToMovement} setProducts={setProductsAddedToMovement}/>
        </StartColumnBox>
        

        </CenterColumnBox>
        <StartColumnBox height={'100%'} mb={'auto'} width={'30% !important'}>
            
            <CardLayout sx={{padding: 3.1, width: '100%', border: `1px solid ${theme.palette.secondary.main}`, boxShadow: 'none'}}>
              <CenterColumnBox width={'100%'} mb={2} gap={2}>
                <StartColumnBox width={'100%'} gap={1}>
                  <Typography color='primary' fontWeight={600} variant='h6'>Detalhes de movimentação</Typography>
                  <Divider sx={{ bgcolor: theme.palette.secondary.light, width: '100%', my: 1}} />
                  <Typography variant='body1'>Tipo de movimentação: <strong>{formatMovementType(formValueGetter('type'))}</strong></Typography>
                  <Typography variant='body1'>Estoque de origem: <strong>{stocks.find(s => s.id === formValueGetter('originStockId'))?.name ?? 'N/A'}</strong></Typography>
                  <Typography variant='body1'>Estoque de destino: <strong>{stocks.find(s => s.id === formValueGetter('destinationStockId'))?.name ?? 'N/A'}</strong></Typography>
                  <Divider sx={{ bgcolor: theme.palette.secondary.light, width: '100%', my: 1}} />
                  <BetweenFlexBox gap={1}>
                    <Typography variant='body1'>Alterar quantidade de produto:</Typography>
                    <TwoColorsChip label={'F1'} sx={{fontWeight: 500, fontSize: 14}} colorPreset="secondary" />
                  </BetweenFlexBox>
                  <BetweenFlexBox gap={1}>
                    <Typography variant='body1'>Remover última adição:</Typography>
                    <TwoColorsChip label={'F6'} sx={{fontWeight: 500, fontSize: 14}} colorPreset="secondary" />
                  </BetweenFlexBox>
                  <BetweenFlexBox gap={1}>
                    <Typography variant='body1'>Alterar estoques de origem e/ou destino:</Typography>
                    <TwoColorsChip label={'F4'} sx={{fontWeight: 500, fontSize: 14}} colorPreset="secondary" />
                  </BetweenFlexBox>
                  <BetweenFlexBox gap={1}>
                    <Typography variant='body1'>Inserir observação:</Typography>
                    <TwoColorsChip label={'F2'} sx={{fontWeight: 500, fontSize: 14}} colorPreset="secondary" />
                  </BetweenFlexBox>
                </StartColumnBox>

                <CenterColumnBox width={'100%'} mt={18} gap={2}>
                  <Button fullWidth variant='outlined' onClick={() => cancelMovement()} sx={{ fontSize: 22, textTransform: 'none', py: 2, px: 8}}>
                    <Typography  variant='h6'>Cancelar <strong>[F10]</strong></Typography>
                  </Button>
                  <Button fullWidth variant='contained' onClick={handleMovementSubmit} sx={{ fontSize: 22, textTransform: 'none', py: 2, px: 8}}>
                    <Typography variant='h6'>Concluir {formatMovementType(formValueGetter('type'))}<strong> [F3]</strong></Typography>
                  </Button>
                </CenterColumnBox>
              </CenterColumnBox>

            </CardLayout>
        </StartColumnBox>
          
          {isQuantityModalOpen && <ProductQuantityDialog productQuantity={selectedProductQuantity} setProductQuantity={setValueAddProduct}/>}
          {isObservationModalOpen && <ObservationsDialog formValueGetter={formValueGetter} formValueSetter={formValueSetter}/>}
      </BetweenFlexBox>
  )
}
