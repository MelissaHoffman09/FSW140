import React, { useState } from 'react';


function AddTravels(props){

    const initInputs = { id: props.id || "", lankmark: props.landmark || "", city: props.city || "", country: props.country|| "", hotel: props.hotel || ""}
    
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = ((e) => {
        const {name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    })
    
    const handleSubmit = ((e) => {
        props.submit(inputs, props.id)
        setInputs(initInputs)
    })

    return (
        <div>
        <div className="card1">
        <h3>Add a Destination</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="landmark"
                    value={inputs.landmark}
                    onChange={handleChange}
                    placeholder="Destination"
                />
                <br/>
                <input
                    type="text"
                    name="city"
                    value={inputs.city}
                    onChange={handleChange}
                    placeholder="City"
                />
                <br/>
                <input
                    type="text"
                    name="country"
                    value={inputs.country}
                    onChange={handleChange}
                    placeholder="Country"
                />
                <br/>
                <input
                    type="text"
                    name="hotel"
                    value={inputs.hotel}
                    onChange={handleChange}
                    placeholder="Hotel"
                />
                <br/>
                <button className="submitB">{ props.buttonText }</button>
            </form>
        </div>
        </div>
    )
}

export default AddTravels;