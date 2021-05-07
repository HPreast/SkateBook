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
    const [trickRelations, setTrickRelations] = useState([])
    const [allTricks, setAllTricks] = useState([])

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    
    const getAllTricks = () => {
        getTricks()
        .then(response => setAllTricks(response))
        // setTricks(allTricks)
    }

    const trickRelationship = () => {
        getUserPracticeTricks(loggedInUser)
        .then(response => {
            let trickRelationsObj = response.map(userRes => userRes.trickId)
            setTrickRelations(trickRelationsObj)
            console.log("trickRelations", trickRelations)
        })
    }

     const notTricks = () => {
        const resultArray = await Promise.all([getAllTricks(), trickRelationship()])
        .then(() => {
            
        let notMyTricks = [...allTricks];
        for(var i = 0, len = trickRelations.length; i < len; i++) {
            for(var j = 0, len2 = notMyTricks.length; j < len2; j++) {
                if (trickRelations[i] === notMyTricks[j].id) {
                    notMyTricks.splice(j, 1);
                    len2 = notMyTricks.length
                }
            }
        }
        console.log("notMyTricks", notMyTricks)
        setTricks(notMyTricks)
        console.log("tricks",tricks)
        console.log("resultArray", resultArray)
    });
    }
    
    useEffect(() => {
        getAllTricks()
        .then(() => trickRelationship())
        .then(() => notTricks())
        
        
        
    }, [])
    // useEffect(() => {
    //     notTricks()
        
    // }, [])
    
    
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