import React, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { getUserEntries, getUserFriends, getUserPracticeTricks, deletePractice, updateList } from "../../modules/UserManager";
import { PracticeCard } from "../profile/PracticeCards"
import { LibraryCard } from "../profile/LibraryCards"
import { EntryFeed } from "./entryFeed";
import { deleteEntry } from "../../modules/EntryManager";
import "../home/home.css"

export const HomePage = () => {
    const [entries, setEntries] = useState([]);
    const [tricks, setTricks] = useState([])
    const [library, setLibrary] = useState([])

    const history = useHistory();

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    const getEntries = () => {
        let friendEntries = [];
        return getUserFriends(loggedInUser)
        .then(result => {
            result.forEach(friend => {
                getUserEntries(friend.user.id)
                .then(entryArray => {
                    friendEntries = friendEntries.concat(entryArray)
                })
                .then(() => getUserEntries(loggedInUser)
                    .then(entry => {
                        let allEntries = []
                        allEntries = friendEntries.concat(entry)
                        setEntries(allEntries)
                    }))
            });
        })
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

    function biggestToSmallest(a, b) {
        return b.timestamp - a.timestamp;
    }
    entries.sort(biggestToSmallest);

    const handleDeleteEntry = (id) => {
        deleteEntry(id)
        .then(() => getEntries())
    }

    useEffect(() => {
        getEntries()
    }, [])
    useEffect(() => {
        trackedTricks()
    }, [])
    useEffect(() => {
        libraryTricks()
    }, [])

    return (
    <>
        <section className="homePage">
            <div className="welcome">
                <h1>Welcome to SkateBook!</h1>
            </div>
            <div className="entries">
                <h2>My Feed</h2><hr></hr>
                <div className="entriesFeed">
                {entries.map(entry =>
                        <EntryFeed
                            key={entry.id}
                            entry={entry}
                            handleDeleteEntry={handleDeleteEntry}
                        />)}
                </div>
            </div>
            <div className="practiceCardsHome">
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
            <div className="libraryCardsHome">
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
        </section>
    </>
    )
}