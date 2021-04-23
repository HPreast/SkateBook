//Displays details and tips for a trick when a card is selected from Trick Lists
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTrickById } from "../../modules/TrickManager"

export const TrickDetails = () => {
    const [tricks, setTricks] = useState([]);
    const {trickId} = useParams();

    const displayDetails = () => {
        return getTrickById(trickId)
        .then(trick =>
            setTricks(trick))
    }
    
    useEffect(() => {
        displayDetails(trickId)
    }, [trickId])
    return (
        <section className="detailContainer">
            <h3 className="detailsName">{tricks.name}</h3>
            <div className="trickSummary">
                <p>{tricks.description}</p>
                <p>{tricks.tips}</p>
            </div>
        </section>
    )
}