//Render list to display users tracked tricks
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getUserPracticeTricks, deletePractice, updateList } from "../../modules/UserManager";
import { PracticeCard } from "../profile/PracticeCards"
import { LibraryCard } from "../profile/LibraryCards"


export const PracticeTricks = () => {
    const [tricks, setTricks] = useState([])
    const [library, setLibrary] = useState([])

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const trackedTricks = () => {
        return getUserPracticeTricks(loggedInUser)
            .then(practice => {
                let incomplete = practice.filter(trick => trick.isComplete === false)

                setTricks(incomplete)
            })
    }

    const libraryTricks = () => {
        return getUserPracticeTricks(loggedInUser)
            .then(practice => {
                let complete = practice.filter(trick => trick.isComplete === true)
                // console.log(complete)
                setLibrary(complete)
            })
    }


    const handleUpdate = (trick) => {
        let completedTrick = { ...trick }
        const newTrick = {
            id: completedTrick.id,
            userId: completedTrick.userId,
            trickId: completedTrick.trickId,
            isComplete: true
        }
        updateList(newTrick)
            .then(() => trackedTricks())
            .then(() => libraryTricks())

    }

    const handleRecall = (trick) => {
        let completedTrick = { ...trick }
        const newTrick = {
            id: completedTrick.id,
            userId: completedTrick.userId,
            trickId: completedTrick.trickId,
            isComplete: false
        }
        updateList(newTrick)
            .then(() => trackedTricks())
            .then(() => libraryTricks())

    }

    const handleDelete = (id) => {
        deletePractice(id)
            .then(() => trackedTricks())
            .then(() => libraryTricks())
    }

    useEffect(() => {
        trackedTricks()
    }, [])
    useEffect(() => {
        libraryTricks()
    }, [])

    return (
        <section className="practiceList">
            <div className="practiceCards">
                <h2>My Practice</h2>
                {tricks.map(trick =>
                    <PracticeCard
                        key={trick.id}
                        trick={trick}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate} />
                )}
            </div>
            <div className="libraryCards">
                <h2>My Library</h2>
                {library.map(trick =>
                <LibraryCard
                    key={trick.id}
                    trick={trick}
                    handleDelete={handleDelete}
                    handleRecall={handleRecall} />)}
            </div>
        </section>
    )


}