import React from "react";
import './PersonsList.css';

const PersonsList = ({ persons, deletePerson }) => {
    return (
        <div>
            <ul style={{listStyleType: "none", padding: 0}}>
                {persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button
                            className="button"
                            onClick={() => deletePerson(person.id)}>
                            delete
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default PersonsList