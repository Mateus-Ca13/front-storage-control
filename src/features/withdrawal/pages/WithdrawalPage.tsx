import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { CenterColumnBox, CenterFlexBox } from '../../../shared/components/Boxes/Boxes'
import SelectModeSection from '../components/SelectModeSection/SelectModeSection'
import { zodResolver } from '@hookform/resolvers/zod'
import { movementSchema, type MovementSchema } from '../../../schemas/MovementSchema'
import { useForm } from 'react-hook-form'
import SelectStocksSection from '../components/SelectStocksSection/SelectStocksSection'
import { WithdrawalStepper } from '../components/WithdrawalStepper/WithdrawalStepper'
import WithdrawalInterface from '../components/WithdrawalInterface/WithdrawalInterface'
import { createMovementApi } from '../../movement/api/movementsApi'
import { useToastStore } from '../../../shared/store/toastStore'

export default function WithdrawalPage() {

  const renderToast = useToastStore(state => state.renderToast)
  const { 
      control: controlMovement,
      reset: movementResetForm,
      handleSubmit: handleSubmitMovement, 
      formState: { errors: errorsMovement }, 
      trigger: triggerMovement,
      getValues: getValuesMovement,
      setValue: setValueMovement } = useForm<MovementSchema>({
      resolver: zodResolver(movementSchema),
      defaultValues: {
      observations: '',
      products: [],
      }
    })
  const [movementStep, setMovementStep] = useState<"operationType" | "usedStocks" | "withdrawal">("operationType")

   const handleMovementSubmit = async (movementData: MovementSchema) => {
          console.log(movementData)
          const returnedData = await createMovementApi(movementData);
          debugger
          if (returnedData.success){
              renderToast({message: 'Transferência registrada com sucesso!', type: 'success', })
              console.log('Transferência registrada com sucesso!', returnedData.data)
              setMovementStep('operationType')
              movementResetForm()
          }else{
              renderToast({message: returnedData.message || 'Erro ao registrar transferência', type: 'error', })
          }
      }
    

  function renderMovementStep() {
    switch (movementStep) {
      case "operationType":

      return <SelectModeSection 
      formValueSetter={setValueMovement}
      formStepSetter={setMovementStep}/>
      
      case "usedStocks":

      return <SelectStocksSection 
      formTrigger={triggerMovement}
      formValueGetter={getValuesMovement}
      formValueSetter={setValueMovement}
      formStepSetter={setMovementStep}
      formControl={controlMovement}
      formErrors={errorsMovement}
      />
      
      case "withdrawal":
      return <WithdrawalInterface
        formTrigger={triggerMovement}
        formValueGetter={getValuesMovement}
        formValueSetter={setValueMovement}
        formStepSetter={setMovementStep}
        formControl={controlMovement}
        formErrors={errorsMovement}
        onSubmitMovement={handleSubmitMovement(handleMovementSubmit)}
      />

      default:
        return <p>404</p>
    }
    }

  useEffect(() => {
    Object.entries(errorsMovement).forEach(([_key, value]) => {
    renderToast({message: value.message as string, type: 'error', })
  });
    
  }, [errorsMovement])


  return (
    <Grid size={{lg: 12, md: 12, sm: 12, xs: 12, xl: 12}}>
      <CenterFlexBox>
        <CardLayout sx={{padding: 4, width: '90%'}}>
            <WithdrawalStepper
            step={movementStep === 'operationType'? 0 : movementStep === 'usedStocks'? 1 : 2}
            steps={['Tipo de Operação', 'Estoques Utilizados', 'Baixa de Produtos']}
            >
              <CenterColumnBox mt={8}  sx={{width: '100%'}}>
                {renderMovementStep()}
              </CenterColumnBox>
            </WithdrawalStepper>
                        
        </CardLayout>
      </CenterFlexBox>
    </Grid>

  )
}
