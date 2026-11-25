import type { IHistoryProps } from "../interfaces/IHistory.interface";
import "./History.css";

export const History = ({terms, passQuery}: IHistoryProps) => {
    return(
        <div className="history">
            <div className="title">
                <h3>Search history: </h3>
            </div>
            <div className="buttons-container">
                    {
                terms && terms.map(item => {
                    return(
                        <button key={item} onClick={()=> passQuery(item)}> {item} </button>
                    )
                })
            }
            </div>
        </div>
    )
}