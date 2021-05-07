import React, { useEffect, useState } from "react";
import { getUserFriends, addFriend, getAllUsers } from "../../modules/UserManager"
import { SearchCard } from "../friends/searchCard"
import "../friends/friends.css"

export const FriendSearch = () => {
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([])
    const [friends, setFriends] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [friendsObj, setFriendsObj] = useState([])
    const [allUsersNotFriends, setAllUsersNotFriends] = useState([])

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const userFriends = () => {
        return getUserFriends(loggedInUser)
            .then(friendsFromDB => {
                let friendsUserObj = friendsFromDB.map(friend => friend.user)
                setFriendsObj(friendsUserObj)
                setFriends(friendsFromDB)
            })
    }

    const getAllTheUsers = () => {
        getAllUsers()
            .then(response => setAllUsers(response))
    }
    const clearSearch = () => {
        setResult("")
    }
    const handleAddFriend = (id) => {
        const newFriend = {
            currentUserId: loggedInUser,
            userId: id
        }
        addFriend(newFriend)
            .then(() => userFriends())
        clearSearch()
    }

    const handleInputChange = (event) => {
        let stateToChange = event.target.value
        setSearch(stateToChange.toLowerCase())
    }

    const results = (searchString) => {
        if (searchString.length > 0) {
            let matchingUsers = allUsersNotFriends.filter(user => {
                if (user.name.toLowerCase().includes(searchString) && user.id !== loggedInUser) {
                    return true
                }
            })
            setResult(matchingUsers)
        }
        else setResult([])
    }

    const notFriends = () => {
        let notMyFriends = [...allUsers];
        for (var i = 0, len = friendsObj.length; i < len; i++) {
            for (var j = 0, len2 = notMyFriends.length; j < len2; j++) {
                if (friendsObj[i].id === notMyFriends[j].id) {
                    notMyFriends.splice(j, 1);
                    len2 = notMyFriends.length
                }
            }
        }
        setAllUsersNotFriends(notMyFriends)
    }
    useEffect(() => {
        results(search)
        userFriends()
        getAllTheUsers()
        notFriends()
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