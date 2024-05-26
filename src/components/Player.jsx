import { useState } from "react";

export default function Player({initalName, symbol, isActive, playerNameChange}) {

    const [playerName, setPlayername] = useState(initalName);

    const [isEditing, setIsEditing] = useState(false);

    function handleInputChange(event) {
        setPlayername(event.target.value);
    }
    function handleEditButtonClick(){
        setIsEditing((editing) => !editing);
        if (isEditing){
            playerNameChange(symbol ,playerName);
        }
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing){
        editablePlayerName = <input onChange={handleInputChange} type="text" value={playerName} reuired></input>;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditButtonClick}>{
                isEditing ? 'Save' : 'Edit'
            }</button>
        </li>
    );
}