import React, { useEffect, useState } from "react";
import { getUserById, getUserEntries } from "../../modules/UserManager";
import { EntryCard } from "../entries/entryCard"
import { useHistory } from "react-router-dom"
import { deleteEntry } from "../../modules/EntryManager";
import { getUserPracticeTricks, deletePractice, updateList } from "../../modules/UserManager";
import { PracticeCard } from "../profile/PracticeCards"
import { LibraryCard } from "../profile/LibraryCards"
import "./MyProfile.css"
import { FriendsList } from "../friends/friendsList";


export const MyProfile = () => {
    const [users, setUsers] = useState({})
    const [entries, setEntries] = useState([])
    const [tricks, setTricks] = useState([])
    const [library, setLibrary] = useState([])

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

    const handleDeleteEntry = (id) => {
        deleteEntry(id)
        .then(() => currentUserEntries())
    }
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
        currentUserEntries()
    }, [])
    useEffect(() => {
        currentUser()
    }, [loggedInUser])
    
    useEffect(() => {
        trackedTricks()
    }, [])
    useEffect(() => {
        libraryTricks()
    }, [])
    function biggestToSmallest(a, b) {
        return b.timestamp - a.timestamp;
    }
    entries.sort(biggestToSmallest);
    return (
        <>
            <section className="profileContainer">
                <div className="profileInfo">
                    <div className="photo">
                        <img id="profilePhoto"src={require(`../images/${users.photo? users.photo : "DefaultUserSkateBook.jpg"}`).default} alt="default profile picture" />
                    </div>
                    <div>
                    <p className="bio"><strong>Name: </strong>{users.name}</p>
                    <p className="bio"><strong>Bio: </strong>{users.bio}</p>
                    </div>
                </div>
                <div className="addEntry">
                <button type="button" className="btn btn-primary"
                    onClick={() => history.push("/entries/create")}>
                    Add New Entry
                </button>
                </div>
                <div className="entryList">
                    <h2>My Progress</h2><hr></hr>
                    {entries.map(entry =>
                        <EntryCard
                            key={entry.id}
                            entry={entry}
                            handleDeleteEntry={handleDeleteEntry}
                        />)}
                </div>
                <div className="practiceCards">
                <h2>My Practice</h2><hr></hr>
                <div className="overflow">
                {tricks.map(trick =>
                    <PracticeCard
                        key={trick.id}
                        trick={trick}
                        handleDelete={handleDelete}
                        handleUpdate={handleUpdate} />
                )}
                </div>
            </div>
            <div className="libraryCards">
                <h2>My Library</h2><hr></hr>
                <div className="overflow">
                {library.map(trick =>
                <LibraryCard
                    key={trick.id}
                    trick={trick}
                    handleDelete={handleDelete}
                    handleRecall={handleRecall} />)}
            </div>
            </div>
            <div className="friendList">
                <div className="overflow">
                <FriendsList />
                </div>
                <button type="button" id="addFriend" className="btn btn-primary" onClick={() => history.push("/friends/search")}>Add a Friend</button>
            </div>
            </section>
        </>
    )
}