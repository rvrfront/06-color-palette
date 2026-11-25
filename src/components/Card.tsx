import { useState } from "react";
import type {ICardProps} from "../interfaces/ICard.interface";

import "./Card.css";


export const Card = ({props}: ICardProps) => {
    const {alpha, id, name, path, radius} = props;
    const [alphaValue, setAlphaValue] = useState(alpha);
    const [radiusValue, setRadiusValue] = useState(radius);
    
    const handleOnChangeAlpha = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        setAlphaValue(Number(e.target.value));
        console.log("alpha value: ", alphaValue);
    }

    const handleOnChangeRadius = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const val = e.target.value + "px";
        setRadiusValue(val);
        console.log("border-radius: ", radiusValue);
    }
    
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