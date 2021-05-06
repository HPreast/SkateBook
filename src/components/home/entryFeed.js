import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { entryComments } from "../../modules/EntryManager"
// import { CommentList } from "../home/commentList"

export const EntryFeed = ({ entry, handleDeleteEntry, handleLike }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [comments, setComments] = useState({})
    // const [clicked, isClicked] = useState(false)

    const getComments = () => {

        let commentArr = [];
        entryComments(entry.id)
            .then(response => {
                console.log(response)
                commentArr = response.map((obj) => obj)
                setComments(commentArr)
            })

    }

    const renderCommentList = () => {
        if (isVisible === true) {
            return (
                <>
                    <button type="button" className="btn btn-primary" onClick={() => setIsVisible(false)}>Hide Comments</button>
                    <ul className="userComments">
                        {comments.map(comment =>
                            <li>{comment.user.name}: {comment.comment}</li>
                        )}
                    </ul>
                </>
            )
            
            
        } else {
            <div></div>
        }


    }

    const renderFriendCommentList = () => {
        if (isVisible === true) {
            return (
                <>
                    <button type="button" className="btn btn-primary" onClick={() => setIsVisible(false)}>Hide Comments</button>
                    <ul className="friendComments">
                        {comments.map(comment =>
                            <li>{comment.user.name}: {comment.comment}</li>
                        )}
                    </ul>
                </>
            )
            
            
        } else {
            <div></div>
        }


    }

    // const displayComments = () => {
    //     if (isVisible === true) {
    //         return (
    //             renderCommentList()
    //         )
    //     }
    // }

    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))

    useEffect(() => {
        getComments()
    }, [])
    // useEffect(() => {
    //     renderCommentList()
    // }, [comments])
    return (
        <>
            {loggedInUser === entry.userId ?
                <>
                    <section className="entryFeed">
                        <h4>Posted by: {entry.user.name}</h4>
                        <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
                        <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
                        <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
                        <p className="likes">Likes: {entry.likes}</p>
                        {/* Need to figure out how to display list of comments in the entry card */}
                        <button type="button" className="btn btn-primary" onClick={() => setIsVisible(true)}>Show Comments</button>
                        <Link to={`/entries/${entry.id}/editHome`}><button className="btn btn-primary" type="button">Edit</button></Link>
                        <button type="button" className="btn btn-primary" onClick={() => handleDeleteEntry(entry.id)}>Remove</button>
                        <div className="comments">
                            {renderCommentList()}
                        </div>
                    </section>
                </> : <>
                    <section className="friendEntryFeed">
                        <h4>Posted by: {entry.user.name}</h4>
                        <div className="entryDate"><strong>Date: </strong>{entry.date}</div>
                        <div className="entryMood"><strong>Mood: </strong>{entry.mood}</div>
                        <div className="entryText"><strong>Entry: </strong>{entry.entry}</div>
                        <p className="likes">Likes: {entry.likes}</p>
                        <button type="button" className="btn btn-primary" onClick={() => handleLike(entry)}>Like</button>
                        <button type="button" className="btn btn-primary" onClick={() => setIsVisible(true)}>Show Comments</button>
                        <div className="comments">
                            {renderFriendCommentList()}
                        </div>
                    </section>
                </>
            }
        </>
    )
}