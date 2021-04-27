//Allow the user to modify a past journal entry
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { editEntry, getEntryById } from "../../modules/EntryManager"

export const EditEntry = () => {
    const [entry, setEntry] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const {entryId} = useParams();
    const history = useHistory();

    const handleInputChange = (event) => {
        const newEntry = {...entry}
        let selectedVal = event.target.value
        newEntry[event.target.id] = selectedVal
        setEntry(newEntry)
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setIsLoading(true)

        const editedEntry = {
            id: entryId,
            userId: entry.userId,
            date: entry.date,
            mood: entry.mood,
            entry: entry.entry
        }
        editEntry(editedEntry)
        .then(() => history.push("/myProfile"))
    }
    useEffect(() => {
        getEntryById(entryId)
        .then(entry => {
            setEntry(entry)
            setIsLoading(false)
        })
    }, [])

    return ( 
        <section className="entryForm">
            <form>
                <h2>Update Entry</h2>
                <fieldset>
                    <div className="formGroup">
                        <label htmlFor="date">Date: </label>
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
                        <label htmlFor="mood">Mood: </label>
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
                        <label htmlFor="entry">Entry: </label>
                        <input type="text"
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
                onClick={handleEdit}
                disabled={isLoading}>
                Update Entry
                </button>
            </form>
        </section>
    )
}