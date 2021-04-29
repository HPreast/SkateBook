import React, { useEffect, useState } from "react";
import { getUserFriends, addFriend, getAllUsers } from "../../modules/UserManager"
import { SearchCard } from "../friends/searchCard"
import "../friends/friends.css"

export const FriendSearch = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const [friends, setFriends] = useState([])

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const userFriends = () => {
        return getUserFriends(loggedInUser)
            .then(friendsFromDB => {
                setFriends(friendsFromDB)
            })
    }

    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        addFriend(newFriend)
            .then(() => userFriends())
    }

    const handleInputChange = (event) => {
        let stateToChange = event.target.value
        setSearch(stateToChange.toLowerCase())


    }

    const results = (searchString) => {
        if (searchString.length > 0) {
            getAllUsers()
                .then(response => {
                    let matchingUsers = response.filter(user => {
                        if (user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                            return true
                        }
                    })
                    setResult(matchingUsers)
                })
        }
        else setResult([])
    }

    useEffect(() => {
        results(search)
    }, [search])
    return (
        <section className="friendSearch">
            <div className="header">
                <h2>Search for Friends</h2><hr></hr>
            </div>
            <div className="searchBox">
                <input type="text"
                    id="search"
                    className="friendSearchBox"
                    required
                    onChange={handleInputChange}
                    placeholder="Search For a Friend"

                />
            </div>
                <div className="searchResults">
                    {result.length === 0 ? <div></div> :
                        result.map(res =>
                            <SearchCard
                                key={res.id}
                                res={res}
                                handleAddFriend={handleAddFriend} />
                        )}
                </div>
        </section>
    )
}