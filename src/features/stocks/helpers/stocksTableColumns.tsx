import type { ColumnConfig } from "../../../shared/types/columnConfig";
import TableActionsMenu from "../../../shared/components/TableActionsMenu/TableActionsMenu";
import { stocksMenuActions } from "./stocksMenuActions";
import type { iStockColumnConfig, StockStatusType, StockType } from "../../../shared/types/stock";
import { TwoColorsChip } from "../../../shared/components/Chips/Chips";
import { formatStockStatus, formatStockType } from "../../../shared/utils/formatters";
import { CenterFlexBox } from "../../../shared/components/Boxes/Boxes";
import { Category } from "@mui/icons-material";
import { Typography } from "@mui/material";


export const stocksTableColumns: ColumnConfig<iStockColumnConfig>[] = [
        { 
            key: 'id', 
            header: 'ID', 
            align: 'center', 
            minWidth: 20},
        { 
            key: 'name', 
            header: 'Nome', 
            align: 'center', 
            minWidth: 50 },
        {
            key: 'type',
            header: 'Tipo',
            align: 'center',
            minWidth: 30,
            format: (value) => <Typography fontSize={14} color={value === 'CENTRAL' ? 'info' : 'success'}>{value ? formatStockType(value as StockType) : '—'}</Typography>
        },
        { 
            key: 'stockedQuantities', 
            header: 'Produtos em estoque', 
            align: 'center', 
            minWidth: 30, 
            format: (value, stock) => <CenterFlexBox gap={1}> {value} <Category color="secondary" fontSize="small"/></CenterFlexBox>
        },
        {
            key: 'status',
            header: 'Status',
            align: 'center',
            minWidth: 50,
            format: (value) => <TwoColorsChip colorPreset={value === 'ACTIVE' ? 'success' : value === 'MAINTENANCE' ? 'warning' : 'error'} label={value ? formatStockStatus(value as StockStatusType) : '—'}/>
        },
        { 
            key: 'actions', 
            header: 'Ações', 
            align: 'center', 
            format: (value, stock) => <TableActionsMenu id={stock?.id ?? -1} actions={stocksMenuActions}/>
        }
    ]