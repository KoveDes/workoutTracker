import {useContext} from "react";
import FiltersContext from "../context/filtersProvider.jsx"

export const useFilters = () => {
    return useContext(FiltersContext);
};