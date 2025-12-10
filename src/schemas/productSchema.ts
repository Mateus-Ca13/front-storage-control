import z from "zod";
import { ProductMeasurementTuple } from "../shared/types/product";

export const productSchema = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string(),
  codebar: z.string().min(5, "Deve ter pelo menos 5 caracteres").nullable(),
  lastPrice: z.number("Insira um valor válido").gte(0, "Valor mínimo deve ser 0 (zero)."),
  categoryId: z.number().nullable(),
  minStock: z.number("Insira um valor válido").min(0, "Valor mínimo deve ser 0 (zero)."),
  measurement: z.enum(ProductMeasurementTuple, {error: "Insira uma opção válida"}),
});

export type ProductSchema = z.infer<typeof productSchema>;

  