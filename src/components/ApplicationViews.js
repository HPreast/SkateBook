import React from "react"
import { Route } from "react-router-dom"
import { TrickList } from "../components/tricks/TrickList"
import { MyProfile } from "./profile/MyProfile"
import { TrickDetails } from "./tricks/TrickDetails"

export const ApplicationViews =() => {
    return (
    <>    
        <Route exact path="/trickList">
            <TrickList />
        </Route>
        <Route path="/trickList/:trickId(\d+)/trickDetails">
            <TrickDetails />
        </Route>
        <Route exact path="/myProfile">
            <MyProfile />
        </Route>
    </>    
    )
}