import { Header } from "./components/Header";
import { Search } from "./components/Search";

import "./App.css";
import {CardContainer} from "./components/CardContainer";
import {History} from "./components/History";
import { useApp } from "./hooks/useApp";

export const App = () => {

  const {query, terms, getQueryFromHistoryComponent, getQueryFromSearchComponent, filteredColors} = useApp();

    return(
    <div className="app">
      <Header title="Enjoy With colors palette"></Header>
      <History terms= {terms} passQuery={getQueryFromHistoryComponent}></History>
      <Search placeholder="Type color to search..." passQuery={getQueryFromSearchComponent}></Search>
      <CardContainer props={filteredColors(query)}></CardContainer>
    </div>
  );
}