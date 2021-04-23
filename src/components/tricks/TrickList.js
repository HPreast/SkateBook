//Display List of Tricks for users to select from
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getTricks } from "../../modules/TrickManager";
import { TrickCard } from "./TrickCard";
// import { trickList } from "../../images/trickList.jpg"

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
    console.log(tricks)
    
    return (
        <section className="trickList">
            <h3 className="listHeader">Trick List</h3>
            {/* img link is currently broken */}
            <img src={require("../../images/trickList.jpg")} alt="Person doing a trick on a skateboard" />
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