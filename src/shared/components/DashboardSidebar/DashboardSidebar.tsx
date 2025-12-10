import { Divider, Drawer, List, styled, Typography, type DrawerProps } from "@mui/material";
import { use, useState } from "react";
import type { SidebarItem } from "../../types/sidebarListItems";
import { AccountCircle, AddCircleOutlineRounded, ControlPointRounded, 
    DashboardRounded, DiscountRounded, ExitToAppOutlined, 
    FormatListBulletedRounded, Help, CategoryRounded, 
    PeopleAlt, RemoveCircleOutlineRounded, 
    Settings, 
    SwapHorizontalCircleOutlined, SyncAltOutlined, 
    VideoLabelOutlined, WarehouseRounded, WifiProtectedSetupRounded } from "@mui/icons-material";
import SidebarListItem from "./SidebarListItem/SidebarListItem";
import { CenterFlexBox } from "../Boxes/Boxes";
import { theme } from "../../../theme/theme";
import { useNavigate } from "react-router-dom";
import { persistCategorySearchFilter, persistMovementSearchFilter, persistProductSearchFilter, persistStockSearchFilter, persistUserSearchFilter } from "../../utils/persistSearchFilter";
import { useMovementStore } from "../../../features/movement/stores/useMovementStore";


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
    const navigate = useNavigate();
    const {openEntryModal, openExitModal, openTransferModal} = useMovementStore()
    const drawerWidth = 320;
    const closedWidth = 60;

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
        { type: 'link', text: 'Caixa (Operacional)', path: '/dashboard/withdrawal', icon:  <VideoLabelOutlined/>},
        { type: 'button', text: 'Usuários', onClick: ()=>{persistUserSearchFilter({}); navigate('/dashboard/users')}, icon: <PeopleAlt/> },
    
    ]

    const footerSidebarListItems: SidebarItem[] = [
        { type: 'link', text: 'Configurações', path: '/dashboard/settings', icon: <Settings/> },
        { type: 'link', text: 'Ajuda', path: '/dashboard/help', icon: <Help/> },
        { type: 'button', text: 'Sair', onClick: ()=>{}, icon: <ExitToAppOutlined/> },
    ]

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
        <Typography variant="h6" noWrap component="div" sx={{ padding: 2 }}>
            <CenterFlexBox 
            gap={2} 
            sx={{ 
                marginTop: 2,
                marginBottom: 2,
                '& .MuiSvgIcon-root, & .MuiTypography-root': { 
                    color: theme.palette.primary.main,  
                    fontWeight: 600
                }}}>
                <AccountCircle fontSize="large"/> {open && <Typography noWrap variant="h6">Olá, usuário!</Typography>}
            </CenterFlexBox>
        </Typography>
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
    </SidebarDrawer>
  )
}
