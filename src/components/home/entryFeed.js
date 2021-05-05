import React from "react"
import { Link } from "react-router-dom"

export const EntryFeed = ({entry, handleDeleteEntry, handleLike}) => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    return (
    <>
        {loggedInUser === entry.userId ? 
        <>
        <section className="entryFeed">
            <h4>Posted by: {entry.user.name}</h4>
            <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
            <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
            <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
            <p className="likes">Likes: {entry.likes}</p>
            <Link to={`/entries/${entry.id}/editHome`}><button className="btn btn-primary" type="button">Edit</button></Link>
            <button type="button" className="btn btn-primary" onClick={() => handleDeleteEntry(entry.id)}>Remove</button>
        </section>
        </> : <>
        <section className="friendEntryFeed">
        <h4>Posted by: {entry.user.name}</h4>
            <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
            <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
            <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
            <p className="likes">Likes: {entry.likes}</p>
            <button type="button" className="btn btn-primary" onClick={() => handleLike(entry)}>Like</button>
        </section>
        </>
        }
    </>
    )
}