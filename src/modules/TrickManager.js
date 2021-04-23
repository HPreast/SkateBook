//fetch calls for tricks objects from databse.json

export const getTricks = () => {
    return fetch("http://localhost:8088/tricks")
    .then(response => response.json())
}