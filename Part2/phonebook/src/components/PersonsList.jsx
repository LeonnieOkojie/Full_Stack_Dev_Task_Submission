import React from "react";

const PersonsList = ({ persons }) => {
    return (
        <div>
            <ul style={{listStyleType: "none", padding: 0}}>
                {persons.map(person =>
                    <li key={person.id}>{person.name} {person.number}</li>
                )}
            </ul>
        </div>
    )
}

export default PersonsList