import { useState } from "react";
import type { ICardProps } from "../interfaces/ICard.interface"

export const useCard = ({props}: ICardProps) => {
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
    
    return {
        //Properties
        path,
        name,
        id,
        alphaValue,
        radiusValue,
        //Methods
        handleOnChangeAlpha,
        handleOnChangeRadius
    }
}