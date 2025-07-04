'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type ContactInfo = {
    phone: string;
    email: string;
    address: string;
};

type ContactContextType = {
    contactInfo: ContactInfo | null;
    setContactInfo: (info: ContactInfo) => void;
};

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: React.ReactNode }) => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    // load contact info on first mount
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/adminSettings/getContact')
            const data = await res.json()
            if (!data.error) setContactInfo(data.contactInfo);
        };
        fetchData();
    }, []);
    console.log(contactInfo, 'contactInfofromcontenct');

    return (
        <ContactContext.Provider value={{ contactInfo, setContactInfo }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    const context = useContext(ContactContext);
    if (!context) throw new Error('useContact must be used inside ContactProvider');
    return context;
};
