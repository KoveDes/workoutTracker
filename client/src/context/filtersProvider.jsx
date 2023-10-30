import React, { createContext, useContext, useState, useCallback } from 'react';

const FiltersContext = createContext({});

export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        target: '',
        search: '',
        equipment: '',
    });

    const setFiltersMemo = useCallback((newFilters) => {
        setFilters(newFilters);
    }, []);

    return (
        <FiltersContext.Provider value={{ filters, setFilters: setFiltersMemo }}>
            {children}
        </FiltersContext.Provider>
    );
};
export default  FiltersContext
