import { createContext, useState } from 'react';

// Создаем контекст
export const SmartMarkupContext = createContext();

// Компонент-провайдер контекста
export function SmartMarkupProvider({ children }) {
    const [projectId, setProjectId] = useState(0);
    const [dataMarkupClasses, setDataMarkupClasses] = useState([]);

    const value = {
        projectId,
        setProjectId: (id) => setProjectId(id),

        dataMarkupClasses,
        setDataMarkupClasses: (newClasses) => setDataMarkupClasses(newClasses),
    };

    return (
        <SmartMarkupContext.Provider value={value}>
            {children}
        </SmartMarkupContext.Provider>
    );
}