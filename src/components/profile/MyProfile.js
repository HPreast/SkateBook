import React, { useEffect, useState } from "react";
import { getUserById } from "../../modules/UserManager";

export const MyProfile = () => {
    const [users, setUsers] = useState({})
    const [entries, setEntries] = useState({})

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const currentUser = () => {
        getUserById(loggedInUser)
        .then(user => 
            setUsers(user))
    }

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
            <div className="progressRecords">
                
            </div>
        </section>    
    </>
    )
}