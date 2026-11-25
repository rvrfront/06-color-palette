import type { ICardContainerProps } from "../interfaces/ICArdContainerProps";
import { Card } from "./Card";

import "./CardContainer.css";

export const CardContainer = ({props = []}: ICardContainerProps) => {
    
    if (props.length === 0) {
        return <h1 className="no-data">No data...</h1>
    }
    
    return(
        <div className="card-container">
            {
                props && props.map(card => {
                    return(
                        <Card props= {card}></Card>
                    )
                })
            }
        </div>
    );
}