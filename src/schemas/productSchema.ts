import z from "zod";
import { ProductMeasurementTuple } from "../shared/types/product";

export const productSchema = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  description: z.string().min(1, "Campo obrigatório").optional(),
  codebar: z.string().min(1, "Campo obrigatório").optional(),
  lastPrice: z.number().min(1, "Campo obrigatório").optional(),
  categoryId: z.number().min(1, "Campo obrigatório").optional(),
  minStock: z.number().min(1, "Campo obrigatório"),
  measurement: z.enum(ProductMeasurementTuple),
});

export type ProductSchema = z.infer<typeof productSchema>;

  