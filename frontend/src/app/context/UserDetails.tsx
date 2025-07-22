'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface userDetails {
    name: string | null,
    userId: string | null,
    profile: string | null,
    role: string
}

interface userDetailsProvider {
    userDetails: userDetails;
    setUserDetails: React.Dispatch<React.SetStateAction<userDetails>>;
    setStoredUserId: React.Dispatch<React.SetStateAction<string | null>>; // 👈 Add this
}


export const UserDetailsContext = createContext<userDetailsProvider | undefined>(undefined);

export const UserDetailsProvider = ({ children }: { children: React.ReactNode }) => {
    const [userDetails, setUserDetails] = useState<userDetails>({
        name: '',
        userId: '',
        profile: null,
        role: ''
    });

    // Mirror localStorage in a state
    const [storedUserId, setStoredUserId] = useState<string | null>(null);

    // Setup listener for localStorage change (optional for cross-tab)
    useEffect(() => {
        const localId = localStorage.getItem('userId');
        setStoredUserId(localId);
    }, []);

    useEffect(() => {
        if (!storedUserId) return;

        const getUser = async () => {
            const res = await fetch('/api/authentication/fetchUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: storedUserId }),
            });

            const data = await res.json();
            console.log("Fetched user data:", data);

            if (!data.error) {
                setUserDetails({
                    name: data.name,
                    userId: data.userId,
                    profile: data.profile,
                    role: data.role
                });
            }
        };

        getUser();
    }, [storedUserId]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails, setStoredUserId }}>
            {children}
        </UserDetailsContext.Provider>

    );
};

export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);
    if (!context) throw new Error("Context handling error");
    return context;
};
