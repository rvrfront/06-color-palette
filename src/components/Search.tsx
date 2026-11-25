import { useState } from "react";
import type { ISearchProps } from "../interfaces/ISearch.interface";
import "./Search.css";

export const Search= ({placeholder, passQuery}: ISearchProps) => {
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

    return(
        <div className="container">
            <input type="text" placeholder={placeholder} value={query} onChange={handleInputOnChange} onKeyDown={handleEnterPressed}/>
            <div className="buttons-container">
                <button onClick={handleOnSearch} id="search">search</button>
                <button onClick={handleOnDelete} id="delete">delete</button>
            </div>
        </div>
    );
}