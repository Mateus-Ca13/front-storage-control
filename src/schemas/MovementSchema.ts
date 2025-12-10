import z from "zod";
import { MovementTuple } from "../shared/types/movement";

import { ProductMeasurementTuple } from "../shared/types/product";

export const movementSchema = z.object({
    type: z.enum(MovementTuple, {error: "Insira uma opção válida"}),
    observations: z.string(),
    userCreatorId: z.number(),
    originStockId: z.number("Selecione um estoque válido").nullable(),
    destinationStockId: z.number("Selecione um estoque válido").nullable(),
    products: z.array(z.object({ 
        productId: z.number(), 
        quantity: z.number().min(1, "Quantidade mínima é 1"),
        pricePerUnit: z.number().min(0, "Valor mínimo deve ser 0 (zero)."),
    }), {error: "A lista de produtos está vazia. Adicione pelo menos um produto"}).min(1, "A lista de produtos está vazia. Adicione pelo menos um produto"),

}).superRefine((data, ctx) => {
  
  // EXIT → precisa ter ORIGEM e destino deve ser null
  if (data.type === "EXIT") {
    if (data.originStockId === null) {
      ctx.addIssue({
        code: "custom",
        message: "O estoque de origem é obrigatório.",
        path: ["originStockId"]
      });
    }
    if (data.destinationStockId !== null) {
      ctx.addIssue({
        code: "custom",
        message: "O estoque de destino deve ser vazio.",
        path: ["destinationStockId"]
      });
    }
  }

  // TRANSFER → precisa ter os dois
  if (data.type === "TRANSFER") {
    if (data.originStockId === null) {
      ctx.addIssue({
        code: "custom",
        message: "Estoque de origem obrigatório para movimentação.",
        path: ["originStockId"]
      });
    }
    if (data.destinationStockId === null) {
      ctx.addIssue({
        code: "custom",
        message: "Estoque de destino obrigatório para movimentação.",
        path: ["destinationStockId"]
      });
    }
     if (
        data.originStockId != null &&
        data.destinationStockId != null &&
        data.originStockId === data.destinationStockId
    ) {
        ctx.addIssue({
            code: "custom",
            message: "Origem e destino não podem ser o mesmo estoque.",
            path: ["destinationStockId"], 
        });
    }
  }

  // ENTRY → destino obrigatório, origem vazia
  if (data.type === "ENTRY") {
    if (data.originStockId !== null) {
      ctx.addIssue({
        code: "custom",
        message: "O estoque de origem deve ser vazio.",
        path: ["originStockId"]
      });
    }
    if (data.destinationStockId === null) {
      ctx.addIssue({
        code: "custom",
        message: "Estoque de destino obrigatório para movimentação.",
        path: ["destinationStockId"]
      });
    }
  }
});

export const addProductToMovementSchema = z.object({
    product: z.object({
        id: z.number("Insira um produto válido"),
        codebar: z.string().nullable(),
        name: z.string(),
        measurement: z.enum(ProductMeasurementTuple, "Insira uma medida válida"),
        lastPrice: z.number("Insira um valor válido").min(0, "Valor mínimo deve ser 0 (zero).").nullable(),
        stockedQuantities: z.number()
    }, {error: "Insira um produto válido"}),
    quantity: z.number("Insira uma quantidade válida").min(1, "Quantidade mínima é 1"),
    pricePerUnit: z.number("Insira um valor válido").min(0, "Valor mínimo deve ser 0 (zero)."),
})

export type AddProductToMovementSchema = z.infer<typeof addProductToMovementSchema>;
export type MovementSchema = z.infer<typeof movementSchema>;