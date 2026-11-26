import type { ISearchProps } from "../interfaces/ISearch.interface";
import "../styles/Search.css";
import { useSearch } from "../hooks/useSearch";

export const Search= ({placeholder, passQuery}: ISearchProps) => {
    const {query, handleInputOnChange, handleOnSearch, handleEnterPressed, handleOnDelete} = useSearch({passQuery});
  
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