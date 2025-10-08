import z from "zod";
import { StockStatusTypeTuple, StockTypeTuple } from "../shared/types/stock";


export const stockSchema = z.object({ 
  name: z.string().min(1, "Campo obrigatório"),
  type: z.enum(StockTypeTuple),
  status: z.enum(StockStatusTypeTuple),
});

export type StockSchema = z.infer<typeof stockSchema>;

  