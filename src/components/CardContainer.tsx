import type { ICardContainerProps } from "../interfaces/ICArdContainerProps";
import { Card } from "./Card";

import "../styles/CardContainer.css";

export const CardContainer = ({props = []}: ICardContainerProps) => {
    
    if (props.length === 0) {
        return <h1 className="no-data">No results</h1>
    }
    
    return(
        <div className="card-container">
            {
                props && props.map(card => {
                    return(
                        <Card key={card.id} props= {card}></Card>
                    )
                })
            }
        </div>
    );
}