import React, { createContext, ReactNode, useState } from "react";

type Props = {
  isMenuOpen: boolean;
  toggleMenu?: () => void;
  closeMenu?: () => void;
};

const NavContext = createContext<Props>({ isMenuOpen: false });

const NavProvider = ({ children }: { children?: ReactNode }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  const closeMenu = () => setMenuOpen(false);

  return (
    <NavContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
        closeMenu,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { NavContext, NavProvider };
