//Displays details and tips for a trick when a card is selected from Trick Lists
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getTrickById } from "../../modules/TrickManager"
import { addPractice } from "../../modules/UserManager";

export const TrickDetails = () => {
    const [tricks, setTricks] = useState([]);
    const {trickId} = useParams();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const displayDetails = () => {
        return getTrickById(trickId)
        .then(trick =>
            setTricks(trick))
    }

    const handleAddToPractice = (id) => {
        const newTrick = {
            userId: loggedInUser,
            trickId: id,
            isComplete: false
        }
        window.confirm("Would you like to add this trick to your practice list?")
        addPractice(newTrick)
        .then(() => displayDetails())
    }

    const handleAddToLibrary = (id) => {
        const newTrick = {
            userId: loggedInUser,
            trickId: id,
            isComplete: true
        }
        window.confirm("Would you like to add this trick to your library?")
        addPractice(newTrick)
        .then(() => displayDetails())
    }
    
    useEffect(() => {
        displayDetails(trickId)
    }, [trickId])
    return (
        <section className="detailContainer">
            <h3 className="detailsName">{tricks.name}</h3>
            <button type="button" className="btn btn-primary" onClick={() => handleAddToPractice(tricks.id)}>Add to Practice</button>
            <button type="button" className="btn btn-primary" onClick={() => handleAddToLibrary(tricks.id)}>Add to Library</button>
            <div className="trickSummary">
                <p>{tricks.description}</p>
                <p>{tricks.tips}</p>
            </div>
        </section>
    )
}