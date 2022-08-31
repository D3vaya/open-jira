import { createContext } from "react";

export interface ContextProps {
  isDragging: boolean;
  sidemenuOpen: boolean;
  isAddingEntry: boolean;
  endDragging: () => void;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  startDragging: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
