export type SidebarLink = {
  type: 'link';
  text: string;
  path: string;
  icon: React.ReactNode;
};

export type SidebarAccordion = {
  type: 'accordion';
  text: string;
  icon: React.ReactNode;
  children: SidebarItem[];
};

export type SidebarButton = {
  type: 'button';
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
};

export type SidebarItem = SidebarLink | SidebarAccordion | SidebarButton;