import React, { useState } from 'react';
import AddTravels from './AddTravels';
import './App.css';

function Travels(props){

    const { id, landmark, city, country, hotel} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div className="card">
        { !editToggle ?
        <> 
            
            <p><strong>Destination:</strong><br/> { landmark }</p>
            <span><strong>Location:</strong><br/>{ city } </span>
            <span>{ country }</span>
            <p><strong>Hotel:</strong><br/> { hotel }</p>

            <div>
            <button
                className="deleteB"
                onClick={() => props.deleteTravels(id)}>
                Delete
            </button>
            <button
                className="editB"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddTravels
                id={id}
                landmark={landmark}
                city={city}
                country={country}
                hotel={hotel}
                buttonText="Submit" 
                submit={props.editTravels}
            />
            <button
                className="deleteB"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Travels;