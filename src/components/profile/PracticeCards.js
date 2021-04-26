import React from "react";
import { Link } from "react-router-dom"

export const PracticeCard = ({trick, handleDelete, handleUpdate}) => {
    return (
        <section className="practiceCard">
            <h3>{trick.trick.name}</h3>
            <Link to={`/trickList/${trick.trick.id}/trickDetails`}><button className="btn btn-primary" type="button">Learn More</button></Link>
            <button type="button" className="btn btn-primary" onClick={() => handleDelete(trick.id)}>Remove</button>
            <label htmlFor="checkbox">Completed <input type="checkbox" 
                                                   id="checkbox" 
                                                   name="checkbox" 
                                                   
                                                   onChange={() => handleUpdate(trick)} /></label>
        </section>
    )
}