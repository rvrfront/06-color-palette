import { useEffect, useState } from "react";
import type { CardProps } from "../interfaces/ICard.interface";
import { getData } from "../helpers/getDataFromApi";

 const cachedResults: Record<string, CardProps[]> = {};

export const useApp = () => {
      const [query, setQuery] = useState("");
      const [colors, setColors] = useState<CardProps[]>([]);
      const [terms, setTerms] = useState<string[]>([]);
      const [displayedColors, setDisplayedColors] = useState<CardProps[]>([]);
            
      const addTerm = (arg: string) => {
        if (arg && !terms.includes(arg) && terms.length <= 7) {
          setTerms([...terms, arg]);
        }
    
      }
      
      const getQueryFromSearchComponent = (arg: string) => {
        console.log("query from my son: ", arg);
        setQuery(arg);
        addTerm(arg);
        setDisplayedColors(handleCachedResults(arg));
      }
    
      const getQueryFromHistoryComponent = (arg: string) => {
        setQuery(arg);
        setDisplayedColors(handleCachedResults(arg));
      }
      useEffect(()=>{
        getData().then(dataColor => {
          setColors(dataColor);
          setDisplayedColors(dataColor);
        });
      },[]);
    
    
      const filteredColors = (query: string): CardProps[] => {
        if (query) {
          return colors.filter(color => color.name.includes(query.toLocaleLowerCase().trim()));
        }
        return colors; 
      }

      const handleCachedResults = (query: string): CardProps[] => {
        const cleanedQuery = query.toLocaleLowerCase().trim();
        if (!cleanedQuery){
          return colors;
        }
        if (!Object.hasOwn(cachedResults, cleanedQuery)){
          cachedResults[cleanedQuery] = filteredColors(cleanedQuery);
        }
        return cachedResults[cleanedQuery];
      }

      
    
    return {
        //Properties
        query,
        colors,
        terms,
        displayedColors,
        //Methods
        getQueryFromHistoryComponent,
        getQueryFromSearchComponent,
        filteredColors,
        handleCachedResults
    }
}