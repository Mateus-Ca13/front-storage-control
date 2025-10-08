import z from "zod";
import { UserRoleTuple } from "../shared/types/user";


export const userSchema = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  username: z.string().min(1, "Campo obrigatório"),
  email: z.email("Email inválido"),
  role: z.enum(UserRoleTuple)
});

export const passwordSchema = z.object({ 
  currentPassword: z.string().min(1, "Campo obrigatório"),
  newPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type PasswordSchema = z.infer<typeof passwordSchema>;

export type UserSchema = z.infer<typeof userSchema>;

  