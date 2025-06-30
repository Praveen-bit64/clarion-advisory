'use client'

import { createContext, ReactNode, useContext, useState } from "react";

type ToggleContextType = {
    isEditMode: boolean;
    toggle: () => void;
};


//create context 
const EditModeToggle = createContext<ToggleContextType | null>(null)

//context provider
export const EditModeToggleProvider = ({ children }: { children: ReactNode }) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const toggle = () => setIsEditMode(prev => !prev)
    return (
        <EditModeToggle.Provider value={{ isEditMode, toggle }}>
            {children}
        </EditModeToggle.Provider>
    );
}

// Custom hook to use it easily
export const useEditMode = () => {
    const context = useContext(EditModeToggle)
    if (!context) throw new Error('useToggle must be used inside ToggleProvider');
    return context;
}
