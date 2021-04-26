//Renders data to be displayed as an entry card
import React from "react"

export const EntryCard = ({entry}) => {
    return (
        <section className="entryCard">
            <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
            <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
            <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
        </section>
    )
}