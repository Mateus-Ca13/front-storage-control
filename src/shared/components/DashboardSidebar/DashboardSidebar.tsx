import { Divider, Drawer, List, styled, Typography, type DrawerProps } from "@mui/material";
import { useState } from "react";
import type { SidebarItem } from "../../types/sidebarListItems";
import { AccountCircle, ControlPointRounded, 
    DashboardRounded, DiscountRounded, ExitToAppOutlined, 
     Help, CategoryRounded, 
    PeopleAlt, RemoveCircleOutlineRounded, 
    Settings, 
    SwapHorizontalCircleOutlined, SyncAltOutlined, 
    VideoLabelOutlined, WarehouseRounded, WifiProtectedSetupRounded, 
    WorkOutlineRounded,
    PersonOutlineOutlined,
    ShieldOutlined} from "@mui/icons-material";
import SidebarListItem from "./SidebarListItem/SidebarListItem";
import { CenterColumnBox, CenterFlexBox, StartFlexBox } from "../Boxes/Boxes";
import { useNavigate } from "react-router-dom";
import { persistCategorySearchFilter, persistMovementSearchFilter, persistProductSearchFilter, persistStockSearchFilter, persistUserSearchFilter } from "../../utils/persistSearchFilter";
import { useMovementStore } from "../../../features/movement/stores/useMovementStore";
import { useConfirmActionDialogStore } from "../../store/confirmActionDialogStore";
import { logoutSession } from "../../../features/auth/helpers/logoutSession";
import { useAuthStore } from "../../../features/auth/stores/useAuthStore";
import { formatStringToMaxLength, formatUserRole } from "../../utils/formatters";
import { TwoColorsChip } from "../Chips/Chips";
import type { UserRoleType } from "../../types/user";
import { LightTooltip } from "../Tooltip/Tooltip";


const SidebarDrawer =  styled(Drawer)<DrawerProps>({
    
    overflowX: 'hidden',
    visibility: 'visible',
    transition: 'width 0.3s',

    '& .MuiDrawer-paper': {
        overflowX: 'hidden',
        visibility: 'visible',
        transition: 'width 0.3s',
    },
});

export default function DashboardSidebar() {

    const [open, setOpen] = useState<boolean>(false);
    const userInfo = useAuthStore(state => state.user)
    const navigate = useNavigate();
    const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog)
    const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
    const {openEntryModal, openExitModal, openTransferModal} = useMovementStore()
    const drawerWidth = 320;
    const closedWidth = 60;
    const version = __APP_VERSION__;
    const hash = __COMMIT_HASH__;

    const mainSidebarListItems: SidebarItem[] = [
        { type: 'link', text: 'Visão Geral', path: '/dashboard', icon: <DashboardRounded/> },
        { type: 'accordion', text: 'Ações rápidas', icon: <WifiProtectedSetupRounded/>, children: [
            { type: 'button', text: 'Nova Entrada', onClick: ()=>{openEntryModal()}, icon: <ControlPointRounded/> },
            { type: 'button', text: 'Nova Saída', onClick: ()=>{openExitModal()},  icon: <RemoveCircleOutlineRounded/> },
            { type: 'button', text: 'Nova Transferência', onClick: ()=>{openTransferModal()},  icon: <SwapHorizontalCircleOutlined/> },
        ] },
        { type: 'button', text: 'Produtos', onClick: ()=>{persistProductSearchFilter({}); navigate('/dashboard/products')}, icon: <CategoryRounded/>},
        { type: 'button', text: 'Estoques',  onClick: ()=>{persistStockSearchFilter({}); navigate('/dashboard/stocks')}, icon: <WarehouseRounded/>},
        { type: 'button', text: 'Categorias', onClick: ()=>{persistCategorySearchFilter({}); navigate('/dashboard/categories')}, icon: <DiscountRounded/> },
        { type: 'button', text: 'Movimentações', onClick: ()=>{persistMovementSearchFilter({}); navigate('/dashboard/movements')}, icon: <SyncAltOutlined/> },
        { type: 'button', text: 'Usuários', onClick: ()=>{persistUserSearchFilter({}); navigate('/dashboard/users')}, icon: <PeopleAlt/> },
        { type: 'link', text: 'Caixa (Operacional)', path: '/dashboard/withdrawal', icon:  <VideoLabelOutlined/>},
    
    ]

    const footerSidebarListItems: SidebarItem[] = [
        { type: 'link', text: 'Configurações', path: '/dashboard/settings', icon: <Settings/> },
        { type: 'link', text: 'Ajuda', path: '/dashboard/help', icon: <Help/> },
        { type: 'button', text: 'Sair', onClick: ()=>{handleLogout()}, icon: <ExitToAppOutlined/> },
    ]

    const handleLogout = () => {
        renderConfirmActionDialog({
            title: 'Encerrar sessão?',
            message: 'Sua sessão será encerrada e você precisará fazer login novamente.',
            confirmAction: {
                label: 'Sair',
                onClick: () => { 
                    logoutSession(); 
                    closeConfirmActionDialog(); 
                }
            },
            cancelAction: {
                label: 'Cancelar',
                onClick: () => {closeConfirmActionDialog()}
            }
        })
    }

  return (
    <SidebarDrawer 
    variant="permanent"
    onMouseOver={() => setOpen(true)} 
    onMouseLeave={()=> setOpen(false)} 
    open={open}
    sx={{
            width: open ? drawerWidth : closedWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: open ? drawerWidth : closedWidth,
                overflowX: "hidden",
                visibility: "visible",
                

            },
        }}>
        <CenterColumnBox>
        <StartFlexBox 
        gap={1} 
        sx={{ 
            marginTop: 3,
            marginBottom: 3
            }}>
            <AccountCircle fontSize="large" color="primary"/> {open && <Typography color="primary" noWrap variant="h6">Olá, {formatStringToMaxLength(userInfo?.username.split(" ")[0], 20)}!</Typography>}
            {open &&
            <LightTooltip title={formatUserRole(userInfo?.role as UserRoleType)} placement="right">
                <TwoColorsChip
                sx={{
                    '& .MuiChip-label': {
                        p: 1,
                        borderRadius: 100
                    }
                }}
                colorPreset={userInfo?.role === 'ADMIN' ? 'info' : userInfo?.role === 'USER' ? 'success' : userInfo?.role === 'SUPER_ADMIN' ? 'warning' : 'error'} 
                label={
                    <CenterFlexBox gap={1}>
                        {userInfo?.role === 'ADMIN' ? <WorkOutlineRounded sx={{ fontSize: 18}}/> : 
                        userInfo?.role === 'USER' ? <PersonOutlineOutlined sx={{ fontSize: 18}}/> : 
                        userInfo?.role === 'SUPER_ADMIN' ? <ShieldOutlined sx={{ fontSize: 18}}/> : 
                        '—'}
                    </CenterFlexBox>
                }/>
            </LightTooltip>
            }
        </StartFlexBox>
        </CenterColumnBox>
        <Divider variant="middle"/>
        <List>
            {mainSidebarListItems.map((item, index) => (
                <SidebarListItem key={index} listItem={item} index={index} isSidebarOpen={open}/>
            ))}
        </List>  
        
        <Divider variant="middle"/>
        <List>
            {footerSidebarListItems.map((item, index) => (
                <SidebarListItem key={index} listItem={item} index={index} isSidebarOpen={open}/>
            ))}
        </List>  
        <CenterFlexBox sx={{opacity: open? '100%': '0%', transition: '0.3s all'}} marginTop={'auto'} mb={2}>
        <Typography variant="body2" color="secondary">v{version} - build {hash}</Typography>
        </CenterFlexBox>
    </SidebarDrawer>
  )
}
