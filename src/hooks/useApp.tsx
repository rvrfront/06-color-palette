import { useEffect, useState } from "react";
import type { CardProps } from "../interfaces/ICard.interface";
import { getData } from "../helpers/getDataFromApi";

export const useApp = () => {
      const [query, setQuery] = useState("");
      const [colors, setColors] = useState<CardProps[]>([]);
      const [terms, setTerms] = useState<string[]>([]);
      
      const addTerm = (arg: string) => {
        if (arg && !terms.includes(arg) && terms.length <= 7) {
          setTerms([...terms, arg]);
        }
    
      }
      
      const getQueryFromSearchComponent = (arg: string) => {
        console.log("query from my son: ", arg);
        setQuery(arg);
        addTerm(arg);
      }
    
      const getQueryFromHistoryComponent = (arg: string) => {
        setQuery(arg);
      }
      useEffect(()=>{
        getData().then(dataColor => setColors(dataColor));
      },[]);
    
    
      const filteredColors = (query: string): CardProps[] => {
        if (query) {
          return colors.filter(color => color.name.includes(query.toLocaleLowerCase().trim()));
        }
        return colors; 
      }
    
    return {
        //Properties
        query,
        colors,
        terms,
        //Methods
        getQueryFromHistoryComponent,
        getQueryFromSearchComponent,
        filteredColors
    }
}