import React from "react";

const PersonsList = ({ persons, deletePerson }) => {
    return (
        <div>
            <ul style={{listStyleType: "none", padding: 0}}>
                {persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button style={
                        {
                            marginLeft: 10, 
                            backgroundColor: "steelblue",
                            borderRadius: 5,
                            border: "none",
                        }}
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