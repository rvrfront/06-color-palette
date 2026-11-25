import { Header } from "./components/Header";
import { Search } from "./components/Search";

import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./helpers/getDataFromApi";
import type { CardProps } from "./interfaces/ICard.interface";

import {CardContainer} from "./components/CardContainer";

export const App = () => {
  const [query, setQuery] = useState("");
  const [colors, setColors] = useState<CardProps[]>([]);
  const getQueryFromSearchComponent = (arg: string) => {
    console.log("query from my son: ", arg);
    setQuery(arg);
  }
  useEffect(()=>{
    getData().then(dataColor => setColors(dataColor));
  },[]);
  return(
    <div className="app">
      <Header title="Enjoy With colors palette"></Header>
      <Search placeholder="Type color to search..." passQuery={getQueryFromSearchComponent}></Search>
      <CardContainer props={colors}></CardContainer>
    </div>
  );
}