import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import { entryComments, addComment, deleteComment } from "../../modules/EntryManager"
// import { CommentList } from "../home/commentList"

export const EntryFeed = ({ entry, handleDeleteEntry, handleLike }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [comments, setComments] = useState([])
    const [clicked, setClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    const [comment, setComment] = useState({
        entryId: entry.id,
        userId: loggedInUser,
        comment: ""
    })
    const history = useHistory();

    // const loggedInUser = JSON.parse(sessionStorage.getItem("headspace_user"))
    // console.log()
    const getComments = () => {

        let commentArr = [];
        entryComments(entry.id)
            .then(response => {
                // console.log(response)
                commentArr = response.map((obj) => obj)
                // console.log(commentArr)
                setComments(commentArr)
            })

    }
    // console.log(comments)

    // const renderCommentList = () => {
    //     if (isVisible === true) {
    //         return (
    //             <>
    //                 <button type="button" className="btn btn-primary" onClick={() => setIsVisible(false)}>Hide Comments</button>
    //                 <ul className="userComments">
    //                     {comments?.map(comment =>
    //                         <li>{comment.user.name}: {comment.comment}</li>
    //                     )}
    //                 </ul>
    //             </>
    //         )


    //     } else {
    //         <div></div>
    //     }


    // }

    const renderFriendCommentList = () => {
        if (isVisible === true) {
            return (
                <>
                    <button type="button" className="btn btn-primary" onClick={() => setIsVisible(false)}>Hide Comments</button>
                    {/* <button type="button" className="btn btn-primary" onClick={() => setClicked(true)}>Leave a Comment</button> */}
                    <ul className="friendComments">
                        {comments.map(comment =>
                            // console.log(comment)
                            <div key={comment.id} className="commentList">
                                <li>{comment.user.name}: {comment.comment}</li>
                                {comment.userId === loggedInUser &&
                                    <button className="btn btn-primary"
                                        onClick={() => handleDeleteComment(comment.id)}
                                    // disabled={isLoading}
                                    >
                                        Delete
                                </button>

                                }
                            </div>
                        )}
                    </ul>
                </>
            )


        } else {
            <div></div>
        }


    }

    const handleInputChange = (event) => {
        const newComment = { ...comment }
        let selectedVal = event.target.value
        newComment[event.target.id] = selectedVal
        setComment(newComment)
    }

    const clearComment = () => {
        setComment({
            entryId: entry.id,
            userId: loggedInUser,
            comment: ""
        })
    }

    const handlePostComment = (event) => {
        event.preventDefault();
        setIsLoading(true)
        addComment(comment)
            .then(() => history.push("/"))
        getComments()
        clearComment()

    }

    const leaveComment = () => {
        // if (clicked === true) {
        return (
            <div className="leaveComment">
                <input type="text" className="commentForm" id="comment" required placeholder="Leave a comment..." value={comment.comment} onChange={handleInputChange} />
                <button className="btn btn-primary"
                    onClick={handlePostComment}
                    disabled={isLoading}>
                    Post Comment
                </button>
            </div>
        )
        // }
    }

    const handleDeleteComment = (id) => {
        deleteComment(id)
            .then(() => getComments())
    }

    // const displayComments = () => {
    //     if (isVisible === true) {
    //         return (
    //             renderCommentList()
    //         )
    //     }
    // }



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
                            {/* {renderCommentList()} */}
                            {renderFriendCommentList()}
                            {leaveComment()}
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
                            {leaveComment()}
                        </div>
                    </section>
                </>
            }
        </>
    )
}