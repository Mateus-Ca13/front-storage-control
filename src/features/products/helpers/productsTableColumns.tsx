import { ArrowForwardIosRounded, ArrowForwardRounded, CancelRounded, Category, CheckCircleRounded, DeleteOutlineRounded, ErrorRounded } from "@mui/icons-material";
import { CenterFlexBox } from "../../../shared/components/Boxes/Boxes";
import { CategoryChip, TwoColorsChip } from "../../../shared/components/Chips/Chips";
import type { ColumnConfig } from "../../../shared/types/columnConfig";
import type { iMinimizedProductColumnConfig, iProductAddedToMovementColumnConfig, iProductColumnConfig } from "../../../shared/types/product";
import { formatMovementType, formatPrice, formatStockType, formatStringToMaxLength, formatTimestamp } from "../../../shared/utils/formatters";
import TableActionsMenu from "../../../shared/components/TableActionsMenu/TableActionsMenu";
import { productsMenuActions } from "./productsMenuActions";
import type { iMinimizedProductMovementsColumnConfig } from "../../../shared/types/movement";
import { Button, Typography } from "@mui/material";
import type { AddProductToMovementSchema } from "../../../schemas/MovementSchema";
import { LightTooltip } from "../../../shared/components/Tooltip/Tooltip";


export const productsTableColumns: ColumnConfig<iProductColumnConfig>[] = [
        { 
            key: 'id', 
            header: 'ID', 
            align: 'center', 
            minWidth: 20},
        { 
            key: 'name', 
            header: 'Nome', 
            align: 'left', 
            minWidth: 50 },
        {
            key: 'codebar',
            header: 'Código de Barras',
            align: 'center',
            minWidth: 50,
            format: (value) => value ? 
            <>{value}</> : 
             <TwoColorsChip sx={{border: 'none', bgcolor: 'transparent'}} colorPreset='error' label={<CenterFlexBox gap={0.5}>Sem registro<ErrorRounded sx={{ fontSize: 16}}/></CenterFlexBox>}/>
        },
        { 
            key: 'category', 
            header: 'Categoria', 
            align: 'center', 
            minWidth: 30, 
            format: (value) => (value && typeof value === 'object') ? 
            <CategoryChip colorPreset={value.colorPreset} label={value.name}/> : 
            '—'},
        {
            key: 'lastPrice',
            header: 'Último preço pago',
            align: 'center',
            minWidth: 30,
            format: (value) => value ? `R$ ${formatPrice(value as number)}` : '—'
        },
        { 
            key: 'stockedQuantities', 
            header: 'Quantidade em Estoque', 
            align: 'center', 
            minWidth: 30, 
            format: (value, product) => <CenterFlexBox gap={1}>{value as number} ({product?.measurement})<Category color="secondary" fontSize="small"/></CenterFlexBox>
        },
        { 
            key: 'isBelowMinStock', 
            header: 'Status', 
            align: 'center', 
            minWidth: 30, 
            format: (value, product) => !value ? 
            <TwoColorsChip colorPreset='success' label={<CenterFlexBox gap={0.5}>Normal<CheckCircleRounded sx={{ fontSize: 16}}/></CenterFlexBox>}/> :
            product?.stockedQuantities! > 0 ?
            <TwoColorsChip colorPreset='warning' label={<CenterFlexBox gap={0.5}>Estoque baixo<ErrorRounded sx={{ fontSize: 16}}/></CenterFlexBox>}/> :
            <TwoColorsChip colorPreset='error'label={<CenterFlexBox gap={0.5}>Sem estoque<CancelRounded sx={{ fontSize: 16}}/></CenterFlexBox>} />
        },
        { 
            key: 'actions', 
            header: 'Ações', 
            align: 'center', 
            format: (value, product) => <TableActionsMenu id={product?.id ?? -1} actions={productsMenuActions}/>
        }
    ]

export const minimizedProductsTableColumns: ColumnConfig<iMinimizedProductColumnConfig>[] = [

    {
        key: 'stockId',
        header: 'ID do Estoque',
        align: 'center',
        minWidth: 20,
        format: (value, data) => <CenterFlexBox gap={1}>{data?.stock.id as number}</CenterFlexBox>
    },
    {
        key: 'stock',
        header: 'Nome do Estoque',
        align: 'center',
        minWidth: 50,
        format: (value, data) => <CenterFlexBox gap={1}>{formatStringToMaxLength(data?.stock?.name, 50)}</CenterFlexBox>
    },
    {
        key: 'type',
        header: 'Tipo',
        align: 'center',
        minWidth: 30,
        format: (value, data) => <CenterFlexBox gap={1}>{formatStockType(data?.stock.type?? 'CENTRAL')}</CenterFlexBox>
    },
    {
        key: 'quantity',
        header: 'Quantidade',
        align: 'center',
        minWidth: 30,
        format: (value, data) => <CenterFlexBox gap={1}>{value as string} <Category color="secondary" fontSize="small"/></CenterFlexBox>
    }
]

export const productMovementsTableColumns: ColumnConfig<iMinimizedProductMovementsColumnConfig>[] = [
    {
        key: 'movementDate',
        header: 'Data/Horário',
        align: 'center',
        minWidth: 20,
        format: (value, data) => <CenterFlexBox gap={1}>{formatTimestamp(data?.movementBatch.createdAt!, 'short')}</CenterFlexBox>
    },
    { 
        key: 'movementType', 
        header: 'Tipo de Movimentação',
        align: 'center', 
        minWidth: 50, 
        format: (value, data) => <TwoColorsChip
        colorPreset={data?.movementBatch.type === 'ENTRY' ? 'success' : data?.movementBatch.type === 'EXIT' ? 'error' : 'warning'}
        label={formatMovementType(data?.movementBatch.type!)}
        />
    },
    {
        key: 'quantity',
        header: 'Quantidade transferida',
        align: 'center',
        minWidth: 30,
        format: (value, data) => <CenterFlexBox gap={1}>{data?.quantity as number} <Category color="secondary" fontSize="small"/></CenterFlexBox>
    },
    {
        key: 'stocks',
        header: 'Origem e Destino',
        align: 'center',
        minWidth: 30,  
        format: (value, data) => (
        <CenterFlexBox 
        alignItems={'center'} 
        gap={0.5}
        >
           <Typography variant="body2" color="error">{formatStringToMaxLength(data?.movementBatch?.originStock?.name, 20)?? ''} </Typography>
            <ArrowForwardRounded fontSize={"small"} /> 
            <Typography variant="body2" color="success.dark">{formatStringToMaxLength(data?.movementBatch?.destinationStock?.name, 20)?? ''}</Typography>
        </CenterFlexBox>)


    },
]

export const minimizedProductMovementsTableColumns: ColumnConfig<iProductAddedToMovementColumnConfig>[] = [

    {
        key: 'codebar',
        header: 'Código',
        align: 'center',
        minWidth: 20,
    },
    {
        key: 'name',
        header: 'Produto',
        align: 'center',
        minWidth: 100,
    },
    {
        key: 'quantity',
        header: 'Quantidade',
        align: 'center',
        minWidth: 50,
    },
    {
        key: 'pricePerUnit',
        header: 'Preço Unitário',
        align: 'center',
        minWidth: 50,
        format: (value, product) => `R$ ${formatPrice(product?.pricePerUnit?? 0)}`
    },
    {
        key: 'totalPrice',
        header: 'Preço Total',
        align: 'center',
        minWidth: 50,
        format: (value, product) => `R$ ${formatPrice((product?.pricePerUnit ?? 0) * (product?.quantity ?? 0))}`
    },
    {
        key: 'action',
        header: 'Ação',
        align: 'center',
        minWidth: 50,
        format: (value, product) => <LightTooltip title="Excluir"><Button onClick={() => product?.excludeAction()}><DeleteOutlineRounded color="error"/></Button></LightTooltip>
        
    },
]
export const withdrawalProductMovementsTableColumns: ColumnConfig<iProductAddedToMovementColumnConfig>[] = [

    {
        key: 'codebar',
        header: 'ID',
        align: 'center',
        minWidth: 20,
    },
    {
        key: 'name',
        header: 'Produto',
        align: 'center',
        minWidth: 100,
    },
    {
        key: 'quantity',
        header: 'Quantidade',
        align: 'center',
        minWidth: 50,
    },
    {
        key: 'pricePerUnit',
        header: 'Preço Unitário',
        align: 'center',
        minWidth: 50,
        format: (value, product) => `R$ ${formatPrice(product?.pricePerUnit?? 0)}`
    },
    {
        key: 'totalPrice',
        header: 'Preço Total',
        align: 'center',
        minWidth: 50,
        format: (value, product) => `R$ ${formatPrice((product?.pricePerUnit ?? 0) * (product?.quantity ?? 0))}`
    },
]



