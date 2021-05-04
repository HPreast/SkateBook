//Display List of Tricks for users to select from
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router";
import { getTricks } from "../../modules/TrickManager";
import { TrickCard } from "./TrickCard";
import trickList from "../images/trickList.jpg"
import "./Tricks.css"
import { getUserPracticeTricks } from "../../modules/UserManager"

export const TrickList = () => {
    const [tricks, setTricks] = useState([]);
    // const [relations, setRelations] = useState([])
    const [trickRelations, setTrickRelations] = useState([])
    const [allTricks, setAllTricks] = useState([])
    const [allTricksNotRelated, setAllTricksNotRelated] = useState([])

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    // const displayTricks = () => {
    //     return getTricks()
    //     .then(items => {
    //         let trickDisplay = items
    //         setTricks(allTricksNotRelated)
    //     })
    // }

    const getAllTricks = () => {
        getTricks()
        .then(response => setAllTricks(response))
    }

    const trickRelationship = () => {
        getUserPracticeTricks(loggedInUser)
        .then(response => {
            // console.log(response)
            // let relationsObj = response.map(relation => relation.trick)
            // setRelations(relationsObj)
            let trickRelationsObj = response.map(userRes => userRes.trickId)
            setTrickRelations(trickRelationsObj)
        })
            
    }

    const notTricks = () => {
           
            let notMyTricks = [...allTricks];
            console.log(notMyTricks)
            for(var i = 0, len = trickRelations.length; i < len; i++) {
                for(var j = 0, len2 = notMyTricks.length; j < len2; j++) {
                    if (trickRelations[i] === notMyTricks[j].id) {
                        notMyTricks.splice(j, 1);
                        len2 = notMyTricks.length
                    }
                }
            }
            // console.log(notMyTricks)
            setTricks(notMyTricks)
    }
    // console.log(allTricksNotRelated)
    // console.log(tricks)
    // console.log(allTricks)
    // console.log(trickRelations)
    // console.log(relations)
    useEffect(() => {
        // displayTricks()
        // console.log("allTricks")
        getAllTricks()
        trickRelationship()
        
    }, [])
    useEffect(() => {
        // console.log("trickList")
        notTricks()
    }, [trickRelations])
    
    
    return (
        <section className="trickList">
            <h2 className="listHeader">Trick List</h2><hr></hr>
            <img id="trickListImg" src={trickList} alt="Person doing a trick on a skateboard" />
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