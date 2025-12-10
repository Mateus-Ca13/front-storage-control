import z from "zod";
import { UserRoleTuple } from "../shared/types/user";


export const userSchema = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  username: z.string().min(1, "Campo obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(UserRoleTuple, {error: "Insira uma opção válida"}),
})

export const createUserDTO = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  username: z.string().min(1, "Campo obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(UserRoleTuple, {error: "Insira uma opção válida"}),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});




export const passwordSchema = z.object({ 
  currentPassword: z.string().min(1, "Campo obrigatório"),
  newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;

export type UserSchema = z.infer<typeof userSchema>;

export type CreateUserDTO = z.infer<typeof createUserDTO>;

  


  