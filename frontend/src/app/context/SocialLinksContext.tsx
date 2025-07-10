'use client';

import { createContext, useContext, useEffect, useState } from "react";

interface SocialLinks {
    insta?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
}

interface SocialLinksContextType {
    socialData: SocialLinks | null;
    setSocialData: React.Dispatch<React.SetStateAction<SocialLinks | null>>;
}

//  Provide full context shape
const SocialLinksContext = createContext<SocialLinksContextType | undefined>(undefined);
export const SocialProvider = ({ children }: { children: React.ReactNode }) => {
    const [socialData, setSocialData] = useState<SocialLinks | null>(null);

    useEffect(() => {
        const fetchSocialLinks = async () => {
            try {
                const res = await fetch("/api/adminSettings/getsociallinks");
                const data = await res.json();
                console.log(data, "socialll");

                if (!data.error) {
                    setSocialData(data.socialLinks);
                }
            } catch (err) {
                console.error("Failed to fetch social links", err);
            }
        };

        fetchSocialLinks();

    }, []);

    return (
        <SocialLinksContext.Provider value={{ socialData, setSocialData }}>
            {children}
        </SocialLinksContext.Provider>
    );
};

export const useSocialData = () => {
    const context = useContext(SocialLinksContext);
    if (!context) {
        throw new Error("useSocialData must be used within a SocialProvider");
    }
    return context;
};

