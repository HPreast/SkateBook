//Fetch calls relating to users

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then(response => response.json())
}

export const getUserEntries = (id) => {
    return fetch (`http://localhost:8088/entries?userId=${id}&_expand=user`)
    .then(response => response.json())
}

export const getUserPracticeTricks = (id) => {
    return fetch(`http://localhost:8088/practice?userId=${id}&_expand=trick`)
    .then(response => response.json())
}

export const addPractice = (trickObj) => {
    return fetch(`http://localhost:8088/practice`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trickObj)
    })
    .then(response => response.json())
}

export const deletePractice = (id) => {
    return fetch(`http://localhost:8088/practice/${id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}
export const updateList = (trickObj) => {
    return fetch(`http://localhost:8088/practice/${trickObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trickObj)
    })
    .then(response => response.json())
}

export const getUserFriends = (id) => {
    return fetch (`http://localhost:8088/friends?currentUserId=${id}&_expand=user`)
    .then(response => response.json())
}
export const addFriend = (friendObj) => {
    return fetch(`http://localhost:8088/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(friendObj)
    })
    .then(response => response.json())
}
export const deleteFriend = (friendId) => {
    return fetch(`http://localhost:8088/friends/${friendId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
}
export const getAllUsers = () => {
    return fetch(`http://localhost:8088/users`)
    .then(response => response.json())
}