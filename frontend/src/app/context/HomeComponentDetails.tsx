'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface homeCompData {
    heroBanner: {
        title: string;
        description: string;
        isvisible: any;
    };
    featured_listings: {
        title: string;
        description: string;
        isvisible: any;
    };
    counter: {
        title: string,
        description: string,
        isVisible: any,
        sec1Title: string,
        sec1Count: string,
        sec2Title: string,
        sec2Count: string,
        sec3Title: string,
        sec3Count: string
    },
    recentlyadded: {
        title: string,
        description: string,
        isvisible: any
    },
    testimonials: {
        title: string,
        description: string,
        isvisible: any
    },
    reviews: [],
    footer: { copyright: string, popularsearch: string[], discover: string[] }
}

interface homeCompContextType extends homeCompData {
    refreshHomeComponents: () => void;
}

const homeComponentContext = createContext<homeCompContextType | undefined>(undefined);

export const HomeComponentProvider = ({ children }: { children: React.ReactNode }) => {
    const [homeComponents, setHomeComponents] = useState<homeCompData>({
        heroBanner: { title: '', description: '', isvisible: false },
        featured_listings: { title: '', description: '', isvisible: false },
        counter: { title: '', description: '', isVisible: false, sec1Count: '', sec1Title: '', sec2Title: '', sec2Count: '', sec3Title: '', sec3Count: '' },
        recentlyadded: { title: '', description: '', isvisible: false },
        testimonials: { title: '', description: '', isvisible: false },
        reviews: [],
        footer: { copyright: '', popularsearch: [], discover: [] }
    });

    const getHomeComponents = async () => {
        try {
            const res = await fetch('/api/homecomponents/gethomecomponents');
            const data = await res.json();
            if (!data.error) {
                setHomeComponents({ heroBanner: data.heroBanner, featured_listings: data.featuredlistings, counter: data.counter, recentlyadded: data.recentlyadded, reviews: data.reviews, testimonials: data.testimonials, footer: data.footer });
            }
        } catch (err) {
            console.error('Failed to load home components:', err);
        }
    };

    useEffect(() => {
        getHomeComponents();
    }, []);

    return (
        <homeComponentContext.Provider
            value={{
                ...homeComponents,
                refreshHomeComponents: getHomeComponents, // expose refetch function
            }}
        >
            {children}
        </homeComponentContext.Provider>
    );
};

export const useHomeComponentDetails = () => {
    const context = useContext(homeComponentContext);
    if (!context) throw new Error('useHomeComponentDetails must be used within a HomeComponentProvider');
    return context;
};
