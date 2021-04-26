import React, { useEffect, useState } from "react";
import { getUserPracticeTricks, addPractice, deletePractice } from "../../modules/UserManager";
import { LibraryCard } from "../profile/LibraryCards"

export const LibraryList = () => {
    const [library, setLibrary] = useState([])

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const libraryTricks = () => {
        return getUserPracticeTricks(loggedInUser)
        .then(practice => {
            let complete = practice.filter(trick => trick.isComplete === true)
            // console.log(complete)
            setLibrary(complete)
        })
    }

    const handleDelete = (id) => {
        deletePractice(id)
        .then(() => libraryTricks())
    }

    useEffect(() => {
        libraryTricks()
    }, [])

    return (
        <section className="libraryList">
            <div className="libraryCards">
                {library.map(trick => 
                    <LibraryCard 
                    key={trick.id}
                    trick={trick}
                    handleDelete={handleDelete}/>)}
            </div>
        </section>
    )
}