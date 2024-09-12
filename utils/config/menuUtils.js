'use client'
// utils/menuUtils.js
import { useState } from 'react';

export const useMenuSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuSidebar = (menuOpen) => {
    setMenuOpen(menuOpen);
  };

  return { menuOpen, handleMenuSidebar };
};
