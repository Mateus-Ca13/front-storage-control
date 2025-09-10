import { useState } from 'react';
import type { SidebarItem } from '../../../types/sidebarListItems';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type SideBarItemProps = {
    listItem: SidebarItem;
    index: number;
    isSidebarOpen?: boolean;
}

const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "itemtype",
})<{ itemtype: "topic" | "subtopic" }>(({ theme, itemtype }) => ({
  paddingTop: 8,
  color:
    itemtype === "topic"
      ? theme.palette.primary.main
      : theme.palette.primary.light,

  "& .MuiListItemIcon-root, & .MuiListItemText-root": {
    color:
      itemtype === "topic"
        ? theme.palette.primary.main
        : theme.palette.primary.light,
  },
}));

const SidebarListText = styled(ListItemText)({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0,

    '& .MuiTypography-root': {
        fontWeight: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
});

export default function SidebarListItem({ listItem, index, isSidebarOpen }: SideBarItemProps) {


    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

            
    function handleAccordionClick(key: number) {
        setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
    }

    function renderSidebarItem(item: SidebarItem, key: number, type: 'topic' | 'subtopic') {
        switch (item.type) {
            case "link":
                return (
                    <StyledListItem key={key} itemtype={type} disablePadding>
                        <ListItemButton component={Link} to={item.path!}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {isSidebarOpen && <SidebarListText primary={item.text} />}
                        </ListItemButton>
                    </StyledListItem>
                );
            case "button":
                return (
                    <StyledListItem itemtype={type} key={key} disablePadding>
                        <ListItemButton onClick={item.onClick}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            {isSidebarOpen && <SidebarListText primary={item.text} />}
                        </ListItemButton>
                    </StyledListItem>
                );
            case "accordion":
                return (
                    <div key={key}>
                        <StyledListItem itemtype={type} disablePadding>
                            <ListItemButton onClick={() => handleAccordionClick(key)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                {isSidebarOpen && <SidebarListText primary={item.text} />}
                                {isSidebarOpen && <ListItemIcon><ExpandMore sx={{ marginLeft: 'auto'}}/></ListItemIcon>}
                            </ListItemButton>
                        </StyledListItem>
                        {isSidebarOpen && <Collapse sx={{marginBottom: 1, marginLeft: 1}} in={!!expanded[key]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {item.children?.map((child, idx) =>
                                    renderSidebarItem(child, `${key}-${idx}` as any, 'subtopic')
                                )}
                            </List>
                        </Collapse>}
                    </div>
                );
            default:
                return null;
        }
    }

  return (
    renderSidebarItem(listItem, index, 'topic')
  )
}