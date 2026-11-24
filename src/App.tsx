import { Header } from "./components/Header";
import { Search } from "./components/Search";

import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./helpers/getDataFromApi";

export const App = () => {
  const [query, setQuery] = useState("");
  const getQueryFromSearchComponent = (arg: string) => {
    console.log("query from my son: ", arg);
    setQuery(arg);
  }
  useEffect(()=>{
    getData().then(console.log);
  },[]);
  return(
    <div className="app">
      <Header title="Enjoy With colors palette"></Header>
      <Search placeholder="Type color to search..." passQuery={getQueryFromSearchComponent}></Search>
    </div>
  );
}