import type { ColumnConfig } from "../../../shared/types/columnConfig";
import TableActionsMenu from "../../../shared/components/TableActionsMenu/TableActionsMenu";
import type { iCategoryColumnConfig } from "../../../shared/types/category";
import { categoryMenuActions } from "./categoryMenuActions";
import { CategoryColorBadge } from "../components/CategoryColorBadge/CategoryColorBadge";
import { CenterFlexBox } from "../../../shared/components/Boxes/Boxes";
import { Category } from "@mui/icons-material";


export const categoryTableColumns: ColumnConfig<iCategoryColumnConfig>[] = [
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
            key: 'linkedProducts',
            header: 'Produtos vinculados',
            align: 'center',
            minWidth: 50,
            format: (value) => <CenterFlexBox gap={1}>{value} <Category color="secondary" fontSize="small"/></CenterFlexBox>
        },
        { 
            key: 'colorPreset', 
            header: 'Padrão de cor', 
            align: 'center', 
            minWidth: 30, 
            format: (value) => <CenterFlexBox><CategoryColorBadge colorPreset={value as number}>{value}</CategoryColorBadge></CenterFlexBox>
        },

        { 
            key: 'actions', 
            header: 'Ações', 
            align: 'center', 
            format: (_value, category) => <TableActionsMenu id={category?.id ?? -1} actions={categoryMenuActions}/>
        }
    ]