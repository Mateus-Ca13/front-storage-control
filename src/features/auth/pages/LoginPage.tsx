import { Box, Typography } from "@mui/material"
import { useEffect } from "react"
import LoginForm from "../components/LoginForm/LoginForm"
import { CenterFlexBox, CenterColumnBox } from "../../../shared/components/Boxes/Boxes"

export default function LoginPage() {

  useEffect(() => {
  }, [])
  
  return (
    <CenterFlexBox
    sx={{
      height: '100vh',
      backgroundColor: 'background.default',
    }}>
        <CenterColumnBox
        sx={{
          width: '60%',
          height: '100%',
          
          backgroundImage: 'url("./src/assets/login_bg.png")',
        }}
        >
          <img
            src="./src/assets/icon.png"
            alt="Logo"
            width={300}
            style={{ borderRadius: '1em', marginBottom: '1em' }}
          />
          <Typography variant="h4" color="common.white" sx={{ mb: 2, fontWeight: 'bold' }}>
            Sistema de Controle de Estoque
          </Typography>
          <Typography variant="body1" color="common.white" sx={{ mb: 4 }}>
           Controle completo sobre produtos, estoques e movimentações em uma única plataforma.
          </Typography>
        </CenterColumnBox>
        <CenterColumnBox
        sx={{
          width: '40%',
          height: '100%',
          boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.1)',
        }}
        >
          <LoginForm/>
        </CenterColumnBox>
    </CenterFlexBox>
  )
}

