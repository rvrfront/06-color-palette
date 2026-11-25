import type {ICardProps} from "../interfaces/ICard.interface";

import "../styles/Card.css";
import { useCard } from "../hooks/useCard";


export const Card = ({props}: ICardProps) => {

   const {path, name, id, alphaValue, radiusValue, handleOnChangeAlpha, handleOnChangeRadius} = useCard({props});
    
    return(
        <div className="card" style={{borderRadius: radiusValue}}>
            <div className="card-img">
                <img src={path} alt={name} style={{opacity: alphaValue / 100}}/>
            </div>
            <div className="info-container">
                <div className="row-1">
                    <span>Name: <strong>{name} </strong> </span>
                    <span>id: <strong>{id}</strong></span>
                </div>
                <div className="row-2">
                    <span>alpha: {alphaValue} </span>
                    <span>border-radius: {radiusValue} </span>
                </div>
                <div className="row-3">
                    <input type="range" id="alpha" min={0} max={100} onChange={handleOnChangeAlpha}/>
                    <input type="range" id="radius" min={0} max={50} onChange={handleOnChangeRadius}/>
                </div>
            </div>
        </div>
    );
}