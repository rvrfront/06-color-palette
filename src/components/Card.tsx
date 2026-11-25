import type {ICardProps} from "../interfaces/ICard.interface";

import "./Card.css";


export const Card = ({props}: ICardProps) => {
    const {alpha, id, name, path, radius} = props;
    return(
        <div className="card">
            <div className="card-img">
                <img src={path} alt={name}/>
            </div>
            <div className="info-container">
                <div className="row-1">
                    <span>Name: {name} </span>
                    <span>id:{id}</span>
                </div>
                <div className="row-2">
                    <span>alpha: {alpha} </span>
                    <span>border-radius: {radius} </span>
                </div>
            </div>
        </div>
    );
}