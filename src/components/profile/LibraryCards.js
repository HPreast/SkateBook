import React from "react";
import { Link } from "react-router-dom"
import "./MyProfile.css"

export const LibraryCard = ({trick, handleDelete, handleRecall}) => {
    return (
        <section className="libraryCard">
            <h3>{trick.trick.name}</h3>
            <Link to={`/trickList/${trick.trick.id}/trickDetails`}><button className="btn btn-primary" type="button">Learn More</button></Link>
            <button type="button" className="btn btn-primary" onClick={() => handleDelete(trick.id)}>Remove</button>
            <label htmlFor="checkbox" className="checkbox">Needs Work<input type="checkbox" 
                                                   id="checkbox" 
                                                   name="checkbox" 
                                                   
                                                   onChange={() => handleRecall(trick)} /></label>
        </section>
    )
}