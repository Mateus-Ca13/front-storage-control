// schemas/loginSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});


export type LoginSchema = z.infer<typeof loginSchema>;
