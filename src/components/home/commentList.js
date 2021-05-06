// import React, { useEffect, useState } from "react"
// import { entryComments } from "../../modules/EntryManager"

// export const CommentList = () => {
//     const [comments, setComments] = useState({})
    

//     const getComments = () => {
//         let commentArr = [];
//         entryComments(entry.id)
//         .then(response => {
//             // console.log(response)
//             commentArr = response.map((obj) => obj.comment)
            
//             // console.log(commentArr)
//             setComments(commentArr)
//         })
//     }
//     console.log(comments)
//     const renderCommentList = () => {
//         comments.map(comment => <li>{comment}</li>)
//     }
//     useEffect(() => {
//         getComments()
//     }, [])
//     return (
//         <ul>
//             {renderCommentList}
//         </ul>
//     )
// }