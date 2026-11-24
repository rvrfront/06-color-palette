import type { IHeaderProps } from "../interfaces/IHeader.interface";
import "./Header.css";

export const Header = ({title}: IHeaderProps) => {
    return(
        <h1 className="header">{title}</h1>
    );
}