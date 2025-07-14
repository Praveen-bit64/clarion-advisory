'use client'
import { createContext, useContext, useEffect, useState } from "react";

interface LikesContextType {
    likesArr: string[];
    toggleLike: (id: string) => void;
    isLiked: (id: string) => boolean;
}

const HandleLikeContext = createContext<LikesContextType | undefined>(undefined);

export const LikeContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [likesArr, setLikesArr] = useState<string[]>([]);

    useEffect(() => {
        const storedLikes = localStorage.getItem("likedprops");
        if (storedLikes) {
            try {
                const parsed = JSON.parse(storedLikes);
                if (Array.isArray(parsed)) setLikesArr(parsed);
            } catch (err) {
                console.error("Failed to parse likedprops:", err);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("likedprops", JSON.stringify(likesArr));
    }, [likesArr]);

    const toggleLike = (id: string) => {
        setLikesArr((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const isLiked = (id: string) => likesArr.includes(id);

    return (
        <HandleLikeContext.Provider value={{ likesArr, toggleLike, isLiked }}>
            {children}
        </HandleLikeContext.Provider>
    );
};

export const useLikes = () => {
    const context = useContext(HandleLikeContext);
    if (!context) throw new Error("Like context is not available");
    return context;
};
