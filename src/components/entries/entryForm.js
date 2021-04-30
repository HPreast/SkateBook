//Render form to allow users to record new journal entries to the database
import React, { useState } from "react";
import { useHistory } from "react-router";
import { addEntry } from "../../modules/EntryManager";
import "../profile/MyProfile.css"

export const EntryForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    const [entry, setEntry] = useState({
        userId: loggedInUser,
        timestamp: Date.now(),
        date: Date.now(),
        mood: "",
        entry: ""
    })
    const history = useHistory();

    const handleInputChange = (event) => {
        const newEntry = {...entry}
        let selectedVal = event.target.value
        newEntry[event.target.id] = selectedVal
        setEntry(newEntry)
    }

    const handleSaveEntry = (event) => {
        event.preventDefault();
        setIsLoading(true)
        addEntry(entry)
        .then(() => history.push("/myProfile"))
    }
    return (
        <section className="entryForm">
            <form className="form">
                <h2>New Entry</h2>
                <fieldset>
                    <div className="formGroup">
                        <label htmlFor="date" className="label">Date: </label>
                        <input type="date"
                            id="date"
                            className="form-control"
                            required
                            autoFocus
                            placeholder="Date of Entry"
                            value={entry.date}
                            onChange={handleInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                <div className="formGroup">
                        <label htmlFor="mood" className="label">Mood: </label>
                        <input type="text"
                            id="mood"
                            className="form-control"
                            required
                            autoFocus
                            placeholder="Mood at Time"
                            value={entry.mood}
                            onChange={handleInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                <div className="formGroup">
                        <label htmlFor="entry" className="label">Entry: </label>
                        <input type="textArea"
                            id="entry"
                            className="form-control"
                            required
                            autoFocus
                            placeholder="Type your entry here..."
                            value={entry.entry}
                            onChange={handleInputChange} />
                    </div>
                </fieldset>
                <button className="btn btn-primary"
                onClick={handleSaveEntry}
                disabled={isLoading}>
                Save Entry
                </button>
            </form>
        </section>
    )
}