//fetch calls for tricks objects from databse.json

export const getTricks = () => {
    return fetch("http://localhost:8088/tricks")
    .then(response => response.json())
}
export const getTrickById = (id) => {
    return fetch(`http://localhost:8088/tricks/${id}`)
    .then(response => response.json())
}