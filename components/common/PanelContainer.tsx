'use client';

import React, { useContext, ReactNode } from 'react';
import { TitleComponentContext } from "@/context/TitleComponentContext";

interface PanelContainerProps {
    children: ReactNode;
}

const PanelContainer: React.FC<PanelContainerProps> = ({ children }) => {
    const context = useContext(TitleComponentContext);
    
    // Usa el titleComponent del contexto
    const titleComponent = context?.titleComponent ?? 'Dashborad';

    return (
        <div className="p-4 sm:ml-64">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0">{titleComponent}</h1>
            </div>
            <div className=" border-2 border-red-200 border-dashed rounded-lg dark:border-gray-700 p-4 py-4   rounded bg-gray-50 dark:bg-gray-800  ">
                {children} 
            </div>
        </div>
    );
}

export default PanelContainer;
