import React, { useEffect, useState } from "react";
import { getUserById, getUserEntries } from "../../modules/UserManager";
import { EntryCard } from "../entries/entryCard"
import { useHistory } from "react-router-dom"
import { deleteEntry } from "../../modules/EntryManager";
import { PracticeTricks } from "./PracticeTricks";


export const MyProfile = () => {
    const [users, setUsers] = useState({})
    const [entries, setEntries] = useState([])
    

    const history = useHistory();
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const currentUser = () => {
        getUserById(loggedInUser)
            .then(user =>
                setUsers(user))
    }

    const currentUserEntries = () => {
        getUserEntries(loggedInUser)
            .then(entry => {
                return setEntries(entry)
            })
    }

    const handleDelete = (id) => {
        deleteEntry(id)
        .then(() => currentUserEntries())
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
                    <img src={`${users.photo}`} alt="default profile picture" />
                    <p><strong>Bio: </strong>{users.bio}</p>
                </div>
                <button type="button" className="btn btn-primary"
                    onClick={() => history.push("/entries/create")}>
                    Add New Entry
                </button>
                <div className="entryList">
                    {entries.map(entry =>
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            handleDelete={handleDelete}
                        />)}
                </div>
                <div className="myLists">
                    <PracticeTricks />
                </div>
            </section>
        </>
    )
}