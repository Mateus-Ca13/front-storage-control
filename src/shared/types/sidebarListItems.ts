export type sidebarListItems = {
    text: string;
    type: 'accordion' | 'link' ;
    path: string; 
    icon: React.ReactNode;
    children?: sidebarListItems[];
};