import React from "react";
import logoImage from "./images/catchon.png";

import "./PowerBy.css";

export const PowerBy = () => {
    return (
        <a href="https://www.catchonlabs.xyz" target="_blank" rel="noreferrer" className="powerBy">
            <h1>Powered by</h1>
            <img src={logoImage} alt="CATCHON" />
        </a>
    )
}