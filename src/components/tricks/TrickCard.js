//Displays trick name and link to details on the Trick List
import React from "react";
import { Link } from "react-router-dom"

export const TrickCard = ({trick}) => {
    return (
    <>
        {/* <Link to={`/trickList/${trick.id}/trickDetails`}> */}
        <section className="trickCard">
            <h3>{trick.name}</h3>
            <Link to={`/trickList/${trick.id}/trickDetails`}><button className="btn btn-primary" type="button">Learn More</button></Link>
        </section>
        {/* </Link> */}
    </>    
    )
}