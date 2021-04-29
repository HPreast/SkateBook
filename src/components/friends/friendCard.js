import React from "react";

export const FriendCard = ({friend, handleDelete}) => {
return (
    <section className="friendCard">
        <h3>{friend.user.name}</h3>
        <button type="button" className="article-btn" onClick={() => handleDelete(friend.id)}>Delete</button>
    </section>
)
}