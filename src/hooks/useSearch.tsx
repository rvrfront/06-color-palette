import { useState } from "react";
import type { ISearchProps } from "../interfaces/ISearch.interface";

export const useSearch = ({passQuery}: ISearchProps) => {
        const [query, setQuery] = useState("");
        const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            setQuery(e.target.value);
        }
    
        const handleOnSearch = () => {
            console.log("query: ", query);
            passQuery(query);
        }
    
        const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && query.trim()) {
                passQuery(query);
            }
            else if (e.key === "Enter" && !query.trim()){
                passQuery("");
            }
        }
    
        const handleOnDelete = () => {
            console.log("Deleting...");
            setQuery("");
            passQuery("");
        }
    return {
        //Properties
        query,
        //Methods
        handleInputOnChange,
        handleOnSearch,
        handleEnterPressed,
        handleOnDelete
    }
}