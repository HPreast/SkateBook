import React from "react"
import { Route } from "react-router-dom"
import { TrickList } from "../components/tricks/TrickList"

export const ApplicationViews =() => {
    return (
        <Route exact path="/trickList">
            <TrickList />
        </Route>
    )
}