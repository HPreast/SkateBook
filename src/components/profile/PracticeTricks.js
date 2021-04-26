//Render list to display users tracked tricks
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserPracticeTricks, deletePractice, updateList } from "../../modules/UserManager";
import { PracticeCard } from "../profile/PracticeCards"


export const PracticeTricks = () => {
    const [tricks, setTricks] = useState([])
    
    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const trackedTricks = () => {
        return getUserPracticeTricks(loggedInUser)
        .then(practice => {
            let incomplete = practice.filter(trick => trick.isComplete === false)
            
            setTricks(incomplete)
        })
    }

    const handleUpdate = (trick) => {
        let completedTrick = {...trick}
        const newTrick = {
            id: completedTrick.id,
            userId: completedTrick.userId,
            trickId: completedTrick.trickId,
            isComplete: true
        }
        updateList(newTrick)
        .then(() => trackedTricks())
    }

    const handleDelete = (id) => {
        deletePractice(id)
        .then(() => trackedTricks())
    }
                   
    useEffect(() => {
    trackedTricks()
    }, [])
   

    return (
        <section className="practiceList">
            <div className="practiceCards">
                {tricks.map(trick => 
                    <PracticeCard 
                    key={trick.id}
                    trick={trick}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate} />
                )}
            </div>
        </section>
    )

    
}