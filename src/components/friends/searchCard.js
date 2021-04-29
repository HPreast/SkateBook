import React from "react"

export const SearchCard = ({res, handleAddFriend}) => {
    return (
        <article className="searchFriendName">
            <h3>{res.name}</h3>
            <button type="button" className="article-btn" onClick={() => handleAddFriend(res.id)}>Add Friend</button>
        </article>
    )
}