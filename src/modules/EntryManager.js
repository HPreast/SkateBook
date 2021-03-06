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

export const likeEntry = (entryObj) => {
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

export const entryComments = (id) => {
    return fetch(`http://localhost:8088/comments?entryId=${id}&_expand=user`)
    .then(response => response.json())
}

export const addComment = (commentObj) => {
    return fetch(`http://localhost:8088/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
    .then(response => response.json())
}

export const deleteComment = (id) => {
    return fetch(`http://localhost:8088/comments/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}