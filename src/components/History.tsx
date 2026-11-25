import type { IHistoryProps } from "../interfaces/IHistory.interface";
import "./History.css";

export const History = ({props}: IHistoryProps) => {
    return(
        <div className="history">
            <div className="title">
                <h3>Search history: </h3>
            </div>
            <div className="buttons-container">
                    {
                props && props.map(item => {
                    return(
                        <button key={item} > {item} </button>
                    )
                })
            }
            </div>
        </div>
    )
}