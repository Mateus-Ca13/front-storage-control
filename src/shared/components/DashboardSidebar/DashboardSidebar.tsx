import { Drawer, List } from "@mui/material";
import { useState } from "react";

export default function DashboardSidebar() {
    const [open, setOpen] = useState<boolean>(true);

    const sidebarListItems = [
        { text: "Dashboard", type: "", path: "/dashboard" },
    ]

  return (
    <Drawer variant="persistent" open={open}>
        <List>
            {sidebarListItems.map((item, index) => (
                <div key={index}>{item.text}</div>
            ))}
        </List>  
    </Drawer>
  )
}
