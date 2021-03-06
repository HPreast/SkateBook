import React, { useEffect, useState } from "react"
import { deleteFriend, getUserFriends } from "../../modules/UserManager"
import { FriendCard } from "./friendCard"
import { useHistory } from "react-router-dom"
import "../friends/friends.css"


export const FriendsList = () => {
    const [friends, setFriends] = useState([])

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const userFriends = () => {
        return getUserFriends(loggedInUser)
        .then(friendsFromDB => {
            setFriends(friendsFromDB)
        })
    }

    const handleDelete = (id) => {
        deleteFriend(id).then(() => {
            userFriends()
        })
    }
    useEffect(() => {
        userFriends()
    }, [])
    return (
        <section className="friendsList">
            <h2>My Friends<hr></hr></h2>
            <div className="friendCards">
                {friends.map(friend =>
                    <FriendCard 
                    key={friend.id}
                    friend={friend}
                    handleDelete={handleDelete}
                    />)}
            </div>
        </section>
    )
}