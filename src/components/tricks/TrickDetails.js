//Displays details and tips for a trick when a card is selected from Trick Lists
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTrickById, getTricks } from "../../modules/TrickManager"
import { addPractice, getUserPracticeTricks } from "../../modules/UserManager";
import { YoutubeEmbed } from "./YoutubeEmbed";

export const TrickDetails = () => {
    const [tricks, setTricks] = useState([]);
    // const [relations, setRelations] = useState([])
    // const [trickRelations, setTrickRelations] = useState([])
    // const [allTricks, setAllTricks] = useState([])
    // const [allTricksNotRelated, setAllTricksNotRelated] = useState([])

    const {trickId} = useParams();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const displayDetails = () => {
        return getTrickById(trickId)
        .then(trick =>
            setTricks(trick))
    }

    // const getAllTricks = () => {
    //     getTricks()
    //     .then(response => setAllTricks(response))
    // }

    // const trickRelationship = () => {
    //     getUserPracticeTricks(loggedInUser)
    //     .then(response => {
    //         console.log(response)
    //         let relationsObj = response.map(relation => relation.trick)
    //         setRelations(relationsObj)
    //         let trickRelationsObj = response.map(userRes => userRes.trickId)
    //         setTrickRelations(trickRelationsObj)
    //     })
            
    // }

    // const notTricks = () => {
    //     let notMyTricks = [...allTricks];
    //     for(var i = 0, len = trickRelations.length; i < len; i++) {
    //         for(var j = 0, len2 = notMyTricks.length; j < len2; j++) {
    //             if (trickRelations[i] === notMyTricks[j].id) {
    //                 notMyTricks.splice(j, 1);
    //                 len2 = notMyTricks.length
    //             }
    //         }
    //     }
    //     console.log(notMyTricks)
    // }

   

    const handleAddToPractice = (id) => {
        const newTrick = {
            userId: loggedInUser,
            trickId: id,
            isComplete: false
        }
        let yes = window.confirm("Would you like to add this trick to your practice list?")
        if(yes === true) {
            addPractice(newTrick) 
        .then(() => displayDetails())
        }
    }

    const handleAddToLibrary = (id) => {
        const newTrick = {
            userId: loggedInUser,
            trickId: id,
            isComplete: true
        }
        let yes = window.confirm("Would you like to add this trick to your library?")
        if(yes === true) {
            addPractice(newTrick) 
        .then(() => displayDetails())
        }
    }

    useEffect(() => {
        displayDetails(trickId)
    
    }, [trickId])

    return (
        // <section className="detailContainer">
        //     {/* <button type="button" className="btn btn-primary" id="practiceBtn"onClick={() => handleAddToPractice(tricks.id)}>Add to Practice</button>
        //     <button type="button" className="btn btn-primary" id="libraryBtn"onClick={() => handleAddToLibrary(tricks.id)}>Add to Library</button> */}
        //     <h2 className="detailsName">{tricks.name}</h2><hr></hr>
        //     <div className="trickSummary">
        //         <p><strong>Description: </strong></p><p className="summary">{tricks.description}</p>
        //         <p><strong>Tips: </strong></p><p className="summary">{tricks.tips}</p>
        //     </div>
        //     <div className="trickGif">
        //         <img src={tricks.gif}></img>
        //     </div>
        //     <div className="embedYT">
        //         <YoutubeEmbed embedId={tricks.yt}/>
        //     </div>
        // </section>
        
        <section className="detailContainer">
            <button type="button" className="btn btn-primary" id="practiceBtn"onClick={() => handleAddToPractice(tricks.id)}>Add to Practice</button>
            <button type="button" className="btn btn-primary" id="libraryBtn"onClick={() => handleAddToLibrary(tricks.id)}>Add to Library</button>
            <h2 className="detailsName">{tricks.name}</h2><hr></hr>
            <div className="trickSummary">
                <p><strong>Description: </strong></p><p className="summary">{tricks.description}</p>
                <p><strong>Tips: </strong></p><p className="summary">{tricks.tips}</p>
            </div>
            <div className="trickGif">
                <img src={tricks.gif}></img>
            </div>
            <div className="embedYT">
                <YoutubeEmbed embedId={tricks.yt}/>
            </div>
        </section>
   
    )
}