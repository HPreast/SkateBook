import React, { useState, useEffect } from "react"
import { useHistory } from "react-router";
import { getUserEntries, getUserFriends } from "../../modules/UserManager";
import { EntryFeed } from "./entryFeed";
import { deleteEntry } from "../../modules/EntryManager";

export const HomePage = () => {
    const [entries, setEntries] = useState([]);

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

    return (
        <section className="homePage">
            <div className="entries">
                <div className="entryFeed">
                {entries.map(entry =>
                        <EntryFeed
                            key={entry.id}
                            entry={entry}
                            handleDeleteEntry={handleDeleteEntry}
                        />)}
                </div>
            </div>
        </section>
    )
}