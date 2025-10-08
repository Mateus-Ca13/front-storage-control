// schemas/loginSchema.ts
import { z } from "zod";

export const categorySchema = z.object({
  colorPreset: z.number().min(1, "Campo obrigatório"),
  name: z.string().min(1, "Campo obrigatório"),
});


export type CategorySchema = z.infer<typeof categorySchema>;
