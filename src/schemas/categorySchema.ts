// schemas/loginSchema.ts
import { z } from "zod";

export const categorySchema = z.object({
  colorPreset: z.number("Insira uma opção válida"),
  name: z.string().min(1, "Campo obrigatório"),
});

export type CategorySchema = z.infer<typeof categorySchema>;
