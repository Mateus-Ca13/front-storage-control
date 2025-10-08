import type { ColumnConfig } from "../../../shared/types/columnConfig";
import TableActionsMenu from "../../../shared/components/TableActionsMenu/TableActionsMenu";
import type { iUserColumnConfig } from "../../../shared/types/user";
import { usersMenuActions } from "./usersMenuActions";
import { TwoColorsChip } from "../../../shared/components/Chips/Chips";
import type { UserRoleType } from "../../auth/types/user";
import { formatUserRole } from "../../../shared/utils/formatters";
import { Typography } from "@mui/material";
import { BuildRounded, PersonOutlineOutlined, ShieldOutlined, WorkOutlineRounded } from "@mui/icons-material";
import { CenterFlexBox } from "../../../shared/components/Boxes/Boxes";


export const usersTableColumns: ColumnConfig<iUserColumnConfig>[] = [
        { 
            key: 'id', 
            header: 'ID', 
            align: 'center', 
            minWidth: 20},
        { 
            key: 'name', 
            header: 'Nome', 
            align: 'left', 
            minWidth: 50,
        },
        {
            key: 'username',
            header: 'Usuário',
            align: 'center',
            minWidth: 50,
        },
        {
            key: 'email',
            header: 'Email',
            align: 'center',
            minWidth: 50,
        },   
        {
            key: 'role',
            header: 'Função',
            align: 'center',
            minWidth: 100,
            format: (value) => (<TwoColorsChip 
                colorPreset={value === 'ADMIN' ? 'info' : value === 'USER' ? 'success' : value === 'SUPER_ADMIN' ? 'warning' : 'error'} 
                label={
                    <CenterFlexBox gap={1}>
                        <Typography variant="body2">{formatUserRole(value as UserRoleType)}</Typography>
                        {value === 'ADMIN' ? <WorkOutlineRounded sx={{ fontSize: 16}}/> : 
                        value === 'USER' ? <PersonOutlineOutlined sx={{ fontSize: 16}}/> : 
                        value === 'SUPER_ADMIN' ? <ShieldOutlined sx={{ fontSize: 16}}/> : 
                        '—'}
                    </CenterFlexBox>
                }/>)
        },

        { 
            key: 'actions', 
            header: 'Ações', 
            align: 'center', 
            format: (value, user) => <TableActionsMenu id={user?.id?? -1} actions={usersMenuActions}/>
        }
    ]