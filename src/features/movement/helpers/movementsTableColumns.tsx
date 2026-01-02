import type { ColumnConfig } from "../../../shared/types/columnConfig";
import TableActionsMenu from "../../../shared/components/TableActionsMenu/TableActionsMenu";
import type { iMovementColumnConfig, iMovementFull, MovementType } from "../../../shared/types/movement";
import { movementsMenuActions } from "./movementsMenuActions";
import { formatMovementType, formatPrice, formatStringToMaxLength, formatTimestamp } from "../../../shared/utils/formatters";
import { CategoryChip, TwoColorsChip } from "../../../shared/components/Chips/Chips";
import { ArrowForwardRounded, Category } from "@mui/icons-material";
import { CenterFlexBox } from "../../../shared/components/Boxes/Boxes";
import { Typography } from "@mui/material";
import { productsMenuActions } from "../../products/helpers/productsMenuActions";


export const movementsTableColumns: ColumnConfig<iMovementColumnConfig>[] = [
        { 
            key: 'id', 
            header: 'ID', 
            align: 'center', 
            minWidth: 20},
        { 
            key: 'createdAt', 
            header: 'Data', 
            align: 'left', 
            minWidth: 50,
            format: (value) => formatTimestamp(value as string, 'short')
        },
        {
            key: 'type',
            header: 'Tipo',
            align: 'center',
            minWidth: 50,
            format: (value) => <TwoColorsChip colorPreset={value === 'ENTRY' ? 'success' : value === 'EXIT' ? 'error' : 'warning'} label={formatMovementType(value as MovementType)}/>
        },   
        {
            key: 'stocks',
            header: 'Origem e destino',
            align: 'center',
            minWidth: 100,
            format: (_value, movement ) => (<CenterFlexBox gap={1}>
                <Typography color="error" variant="body2">{formatStringToMaxLength(movement?.originStock?.name, 50)?? ''}</Typography>
                < ArrowForwardRounded fontSize="small"/>
                <Typography color="success" variant="body2">{formatStringToMaxLength(movement?.destinationStock?.name, 50)?? ''}</Typography></CenterFlexBox>)
        },
        { 
            key: 'totalProducts', 
            header: 'Produtos movimentados', 
            align: 'center', 
            minWidth: 30, 
            format: (value) => <CenterFlexBox gap={1}>{value as number} <Category color="secondary" fontSize="small"/></CenterFlexBox>
        },

        { 
            key: 'user', 
            header: 'Usuário', 
            align: 'center', 
             minWidth: 50,
        },

        { 
            key: 'actions', 
            header: 'Ações', 
            align: 'center', 
            format: (_value, mov) => <TableActionsMenu id={mov?.id?? -1} actions={movementsMenuActions}/>
        }
    ]

export const movementsRelationedProductsTableColumns: ColumnConfig<iMovementFull['products'][number]>[] = [
    {
        key: 'id',
        header: 'ID do Produto',
        align: 'center',
        minWidth: 20,
        format: (_value, movedProduct) => movedProduct?.product.id
    },
    {
        key: 'name',
        header: 'Nome do Produto',
        align: 'center',
        minWidth: 70,
        format: (_value, movedProduct) => movedProduct?.product.name
    },
    {
        key: 'codebar',
        header: 'Código de Barras',
        align: 'center',
        minWidth: 50,
        format: (_value, movedProduct) => movedProduct?.product.codebar ? movedProduct?.product.codebar : '—'
    },
    {
        key: 'category',
        header: 'Categoria',
        align: 'center',
        minWidth: 30,
        format: (_value, movedProduct) => movedProduct?.product.category ? <CategoryChip colorPreset={movedProduct?.product.category.colorPreset} label={movedProduct?.product.category.name}/> : '—'
    },
    {
        key: 'quantity',
        header: 'Quantidade',
        align: 'center',
        minWidth: 30,
        format: (value, movedProduct) => `${value} (${movedProduct?.product.measurement})`
    },
    {
        key: 'pricePerUnit',
        header: 'Preço por unidade',
        align: 'center',
        minWidth: 30,
        format: (value) => `R$ ${formatPrice(value as number)}`
    },
    {
        key: 'total',
        header: 'Total',
        align: 'center',
        minWidth: 30,
        format: (_value, product) => `R$ ${formatPrice((product?.pricePerUnit?? 0) * (product?.quantity?? 0))}`
    },
    {
        key: 'actions',
        header: 'Ações',
        align: 'center',
        format: (_value, movedProduct) => <TableActionsMenu id={movedProduct?.product.id?? -1} actions={productsMenuActions}/>
    }

]

    