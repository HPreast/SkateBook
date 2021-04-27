//Display List of Tricks for users to select from
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getTricks } from "../../modules/TrickManager";
import { TrickCard } from "./TrickCard";
import trickList from "../images/trickList.jpg"
import "./Tricks.css"

export const TrickList = () => {
    const [tricks, setTricks] = useState([]);

    const displayTricks = () => {
        return getTricks()
        .then(items => {
            let trickDisplay = items
            setTricks(trickDisplay)
        })
    }
    useEffect(() => {
        displayTricks()
    }, [])
    
    
    return (
        <section className="trickList">
            <h3 className="listHeader">Trick List</h3>
            {/* img link is currently broken */}
            <img src={trickList} alt="Person doing a trick on a skateboard" />
            <div className="listContainer">
                {tricks.map(trick => 
                    <TrickCard 
                    key={trick.id}
                    trick={trick} />
                )}
            </div>
        </section>
    )
}