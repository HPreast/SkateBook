// Fetch calls relating to entries

export const addEntry = (entryObj) => {
    return fetch(`http://localhost:8088/entries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
    .then(response => response.json())
}

export const editEntry = (entryObj) => {
    return fetch(`http://localhost:8088/entries/${entryObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObj)
    })
    .then(response => response.json())
}

export const getEntryById = (id) => {
    return fetch(`http://localhost:8088/entries/${id}`)
    .then(response => response.json())
}

export const deleteEntry = (id) => {
    return fetch(`http://localhost:8088/entries/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}