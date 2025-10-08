import React, { useState } from 'react'
import type { ActionMenuOption } from '../../types/actionMenuOption'
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { theme } from '../../../theme/theme'
import { useNavigate } from 'react-router-dom'

type TableActionsMenuProps = {
    actions: ActionMenuOption[]
    id: number
}

export default function TableActionsMenu({ actions, id }: TableActionsMenuProps) {

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz fontSize='small'/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={
          {
            vertical: 'bottom',
            horizontal: 'right',
          }
        }
        transformOrigin={{
          vertical: 'top',    
          horizontal: 'right',  
        }}

        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        {actions.map((action, index)=>{
          return (
            <div>
              <MenuItem dense sx={{
                '.MuiListItemText-root, .MuiListItemIcon-root': {color: action.color !== 'common' ? theme.palette[action.color!].dark : theme.palette.common.black}}} 
                key={action.key} 
                onClick={()=>action.action(id, navigate)}>
                <ListItemIcon>
                  {action.icon}
                </ListItemIcon>
                <ListItemText>{action.label}</ListItemText>
              </MenuItem>
              { index !== actions.length - 1 && <Divider/>}
            </div>
            )
            
        })}
      </Menu>
    </div>

  )
}