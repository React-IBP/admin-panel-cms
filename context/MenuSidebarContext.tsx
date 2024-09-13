"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface MenuContextProps {
  menuOpen: boolean;
  handleMenuSidebar: () => void;
}

export const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenuSidebar = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuSidebar must be used within a MenuSidebarProvider");
  }
  return context;
};

interface MenuSidebarProviderProps {
  children: ReactNode;
}

export const MenuSidebarProvider: React.FC<MenuSidebarProviderProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(true);

  useEffect(() => {
    const storedMenuOpen = JSON.parse(localStorage.getItem("menuOpen") || "true");
    setMenuOpen(storedMenuOpen);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuOpen", JSON.stringify(menuOpen));
  }, [menuOpen]);

  const handleMenuSidebar = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <MenuContext.Provider value={{ menuOpen, handleMenuSidebar }}>
      {children}
    </MenuContext.Provider>
  );
};
