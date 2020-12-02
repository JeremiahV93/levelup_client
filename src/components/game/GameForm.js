import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"


export const GameForm = props => {
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 1,
        title: "",
        maker: "",
        gameTypeId: 1
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const handleControlledInputChange = (event) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker} max={10}
                        onChange={handleControlledInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Payers: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers} max='10' min='1'
                        onChange={handleControlledInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                
                    <select name="skillLevel" value={currentGame.skillLevel}
                        onChange={handleControlledInputChange}>
                      <option value='1'> 1</option>
                      <option value='2'> 2</option> 
                      <option value='3'> 3</option> 
                      <option value='4'> 4</option> 
                      <option value='5'> 5</option>   
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                
                    <select name="gameTypeId" value={currentGame.gameTypeId}
                        onChange={handleControlledInputChange}>
                      {gameTypes.map((type) => <option value={type.id} key={type.id}> {type.label} </option>) }
                    </select>
                </div>

            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)    
                        .then(() => { props.history.push('./')})
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
