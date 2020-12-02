import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventList } from "./game/EventList.js"
import { EventProvider } from "./game/EventProvider.js"
import { GameForm } from './game/GameForm'

export const ApplicationViews = () => {

    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <GameProvider>
                <Route exact path="/games" render={props => <GameList {...props} />} />
                    <Route exact path="/games/new" render={props => <GameForm {...props} />} />
            </GameProvider>
            <EventProvider>
                <Route exact path="/events">
                <EventList />
                </Route>
            </EventProvider>
        </main>
    </>
}
