// ScreenSizeContext.tsx
'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ScreenSize = 'mobile' | 'tablet' | 'desktop';

interface ScreenSizeContextType {
    screenSize: ScreenSize;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const ScreenSizeContext = createContext<ScreenSizeContextType | undefined>(undefined);

export const useScreenSize = () => {
    const context = useContext(ScreenSizeContext);
    if (!context) {
        throw new Error("useScreenSize must be used within ScreenSizeProvider");
    }
    return context;
};

export const ScreenSizeProvider = ({ children }: { children: ReactNode }) => {
    const breakpoints = {
        mobile: 768,
        tablet: 1024,
    };

    const getSize = (): ScreenSize => {
        if (typeof window === 'undefined') return 'desktop'; // SSR fallback
        const width = window.innerWidth;
        if (width < breakpoints.mobile) return 'mobile';
        if (width < breakpoints.tablet) return 'tablet';
        return 'desktop';
    };

    const [screenSize, setScreenSize] = useState<ScreenSize>(getSize());

    useEffect(() => {
        const handleResize = () => setScreenSize(getSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const contextValue: ScreenSizeContextType = {
        screenSize,
        isMobile: screenSize === 'mobile',
        isTablet: screenSize === 'tablet',
        isDesktop: screenSize === 'desktop',
    };

    return (
        <ScreenSizeContext.Provider value={contextValue}>
            {children}
        </ScreenSizeContext.Provider>
    );
};
