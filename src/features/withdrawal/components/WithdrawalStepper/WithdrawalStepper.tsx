import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Typography } from '@mui/material';
import { StartFlexBox } from '../../../../shared/components/Boxes/Boxes';

interface WithdrawalStepperProps {
  step: number;          
  steps: string[];       
  children: React.ReactNode; 
}

export function WithdrawalStepper({ step, steps, children }: WithdrawalStepperProps) {
  
  return (
    <Box sx={{ width: '100%' }}>
      <StartFlexBox sx={{ mb: 4, gap: 4 }}>
        <Typography variant='h5' color='primary' sx={{ fontWeight: 600 }}>
        Caixa (Modo Operacional)
        </Typography>
        <Stepper activeStep={step} sx={{ width: '40%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StartFlexBox>
      <Box>
        {children}
      </Box>
    </Box>
  );
}

