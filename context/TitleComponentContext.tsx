"use client";

import { createContext, useEffect, useState, ReactNode } from "react";



export const TitleComponentContext = createContext<TitleComponentContextProps | undefined>(undefined);

interface TitleComponentContextProviderProps {
    children: ReactNode;
}

export const TitleComponentContextProvider: React.FC<TitleComponentContextProviderProps> = ({ children }) => {
    const [titleComponent, setTitleComponent] = useState<string>("Dashborad");

    const setTitle = (title: string) => {
        setTitleComponent(title);
    };

    // Ejecutar solo en el cliente
    useEffect(() => {
        const storedTitle = localStorage.getItem("titleComponent");
        if (storedTitle) {
            setTitleComponent(storedTitle);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("titleComponent", titleComponent);
    }, [titleComponent]);

    return (
        <TitleComponentContext.Provider value={{ titleComponent, setTitle }}>
            {children}
        </TitleComponentContext.Provider>
    );
};
