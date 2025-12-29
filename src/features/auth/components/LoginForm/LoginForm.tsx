import { Button, CircularProgress, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { CenterColumnBox } from "../../../../shared/components/Boxes/Boxes";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { loginUserApi } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

export default function LoginForm() {
    const navigate = useNavigate();
    const setUserInfo = useAuthStore(state => state.setUserInfo);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {register, handleSubmit, formState: { errors, isSubmitting }, setError} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const handleOnSubmit = async (data: LoginSchema) => {
        let returnedData = await loginUserApi(data.username, data.password);

        if (returnedData.success && returnedData.data) {
          navigate("/dashboard", { replace: true })
          debugger
          setUserInfo(returnedData.data);
        return;
        }
          setError("root", { type: "manual", message: returnedData.message });
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

  return (
    <Paper elevation={2} sx={{ padding: 8 }}>
    <CenterColumnBox>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Bem-vindo(a) de volta!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Por favor, insira suas credenciais para acessar sua conta.
        </Typography>
        
        <CenterColumnBox 
        component={"form"} 
        sx={{ width: '100%', gap: 2, mt: 4 }}
        onSubmit={handleSubmit(handleOnSubmit)}>
            <TextField
            fullWidth 
            label="E-mail ou usuário" 
            {...register("username")} 
            error={!!errors.username}
            helperText={errors.username?.message}
            required />

            <TextField
            fullWidth
            label="Senha" 
            
            type={showPassword? "text" :"password"} 
            {...register("password")} 
            error={!!errors.password}
            helperText={errors.password?.message}
            required
            slotProps={{
            input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ cursor: 'pointer' }}
                onClick={() => {togglePasswordVisibility() }}
              >
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </InputAdornment>
            ),
          },
        }}>
            </TextField>
            {errors.root && (
              <Typography color="error">
                {errors.root.message}
              </Typography>
            )}
            <Button
            sx={{ mt: 2, p: 2 }}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            >
            {isSubmitting ? <CircularProgress size={24} /> : 'Entrar'}
            </Button>
        </CenterColumnBox>
    </CenterColumnBox>
    </Paper>
  )
}
