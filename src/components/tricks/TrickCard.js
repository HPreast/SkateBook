//Displays trick details when a trick is selected from the TrickList
import React from "react";

export const TrickCard = ({trick}) => {
    return (
        <section className="trickCard">
            <h3>{trick.name}</h3>
            <button className="btn btn-primary" type="button">Learn More</button>
        </section>
    )
}