import React, { useEffect, useState } from "react";
import { getUserById, getUserEntries } from "../../modules/UserManager";
import { EntryCard } from "../entries/entryCard"

export const MyProfile = () => {
    const [users, setUsers] = useState({})
    const [entries, setEntries] = useState({})

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const currentUser = () => {
        getUserById(loggedInUser)
        .then(user => 
            setUsers(user))
    }

    const currentUserEntries = () => {
        getUserEntries(loggedInUser)
        .then(entry => 
            setEntries(entry))
    }

    useEffect(() => {
        currentUserEntries()
    }, [])

    useEffect(() => {
        currentUser()
    }, [loggedInUser])
    return (
    <>
        <section className="profileContainer">
            <div className="profileInfo">
                <img src={`${users.photo}`} alt="default profile picture"/>
                <p><strong>Bio: </strong>{users.bio}</p>
            </div>
            <div className="entryCards">
                {entries.map(entry =>
                    <EntryCard 
                    key={entry.id}
                    entry={entry}
                    />)}
            </div>
        </section>    
    </>
    )
}