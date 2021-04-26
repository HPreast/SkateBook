//Render list to display users tracked tricks
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserPracticeTricks, addPractice, deletePractice } from "../../modules/UserManager";
import { PracticeCard } from "../profile/PracticeCards"

export const PracticeTricks = () => {
    const [tricks, setTricks] = useState([])

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const trackedTricks = () => {
        return getUserPracticeTricks(loggedInUser)
        .then(practice => {
            let incomplete = practice.filter(trick => trick.isComplete === false)
            console.log(incomplete)
            setTricks(incomplete)
        })
    }
    
    const handleDelete = (id) => {
        deletePractice(id)
        .then(() => trackedTricks())
    }

    // const handleAddPractice = (id) => {
        //     const newPractice = {
            //         userId: loggedInUser,
            //         trickId: id
            //     }
            //     addPractice(newPractice)
            //     .then(() => trackedTricks())
            // }
            
            
    // console.log(trackedTricks())
    useEffect(() => {
    trackedTricks()
    }, [])

    return (
        <section className="practiceList">
            <h2>My Practice</h2>
            <div className="practiceCards">
                {tricks.map(trick => 
                    <PracticeCard 
                    key={trick.id}
                    trick={trick}
                    handleDelete={handleDelete} />
                )}
            </div>
        </section>
    )

    
}