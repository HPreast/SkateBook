//Fetch calls relating to users

export const getUserById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then(response => response.json())
}

export const getUserEntries = (id) => {
    return fetch (`http://localhost:8088/entries?userId=${id}&_expand=user`)
    .then(response => response.json())
}