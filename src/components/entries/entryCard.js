//Renders data to be displayed as an entry card
import React from "react"
import { Link } from "react-router-dom"

export const EntryCard = ({entry, handleDelete}) => {
    return (
        <section className="entryCard">
            <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
            <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
            <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
            <Link to={`/entries/${entry.id}/edit`}><button className="btn btn-primary" type="button">Edit</button></Link>
            <button type="button" className="btn btn-primary" onClick={() => handleDelete(entry.id)}>Remove</button>
        </section>
    )
}