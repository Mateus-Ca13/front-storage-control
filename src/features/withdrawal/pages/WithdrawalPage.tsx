import { Button, Grid } from '@mui/material'
import { useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { CenterColumnBox, CenterFlexBox } from '../../../shared/components/Boxes/Boxes'
import SelectModeSection from '../components/SelectModeSection/SelectModeSection'
import { zodResolver } from '@hookform/resolvers/zod'
import { movementSchema, type MovementSchema } from '../../../schemas/MovementSchema'
import { useForm } from 'react-hook-form'
import SelectStocksSection from '../components/SelectStocksSection/SelectStocksSection'
import { WithdrawalStepper } from '../components/WithdrawalStepper/WithdrawalStepper'
import WithdrawalInterface from '../components/WithdrawalInterface/WithdrawalInterface'

export default function WithdrawalPage() {

  const {register: registerMovement, 
      control: controlMovement,
      reset: movementResetForm,
      resetField: movementResetField,
      watch: watchMovement,
      handleSubmit: handleSubmitMovement, 
      formState: { errors: errorsMovement, isSubmitting: isSubmittingMovement }, 
      setError: setErrorMovement,
      trigger: triggerMovement,
      getValues: getValuesMovement,
      setValue: setValueMovement } = useForm<MovementSchema>({
      resolver: zodResolver(movementSchema),
      defaultValues: {
      observations: '',
      products: [],
      userCreatorId:  1
      }
    })
  const [movementStep, setMovementStep] = useState<"operationType" | "usedStocks" | "withdrawal">("operationType")
    

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
      />

      default:
        return <p>404</p>
    }
    }

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
            
            <Button onClick={()=>console.log(getValuesMovement())}>Log de movimentação</Button>
            
        </CardLayout>
      </CenterFlexBox>
    </Grid>

  )
}
