import React from "react"
import { Route } from "react-router-dom"
import { TrickList } from "../components/tricks/TrickList"
import { MyProfile } from "./profile/MyProfile"
import { TrickDetails } from "./tricks/TrickDetails"
import { EntryForm } from "../components/entries/entryForm"
import { EditEntry } from "../components/entries/entryEditForm"
import { FriendSearch } from "./friends/friendSearch"
import { HomePage } from "./home/home"

export const ApplicationViews =() => {
    return (
    <>    
        <Route exact path="/">
            <HomePage />
        </Route>
        <Route exact path="/trickList">
            <TrickList />
        </Route>
        <Route path="/trickList/:trickId(\d+)/trickDetails">
            <TrickDetails />
        </Route>
        <Route exact path="/myProfile">
            <MyProfile />
        </Route>
        <Route path="/entries/create">
            <EntryForm />
        </Route>
        <Route path="/entries/:entryId(\d+)/edit">
            <EditEntry />
        </Route>
        <Route path="/friends/search">
            <FriendSearch />
        </Route>
    </>    
    )
}