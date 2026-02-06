import { createContext } from 'react';

const SidebarContext = createContext({
  isSidebarOpen: true,
  setIsSidebarOpen: () => {},
});

export default SidebarContext;
