import React from "react";

const PersonsList = ({ personsToShow }) => {
    return (
        <div>
            <ul style={{listStyleType: "none", padding: 0}}>
                {personsToShow.map(person =>
                    <li key={person.id}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )
}

export default PersonsList