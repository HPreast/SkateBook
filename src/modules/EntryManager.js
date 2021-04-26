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