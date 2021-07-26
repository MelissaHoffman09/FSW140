import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Travels from './Travels'
import './App.css'
import AddTravels from './AddTravels';

function App() {

  const [travels, setTravels] = useState([])
  
  const getTravels = (() => {
      axios.get("http://localhost:6500/get")
          .then(res => setTravels(res.data))
          .catch(err => console.log(err))
  })

  const addTravels = ((newTravels) => {
    axios.post("http://localhost:6500/post", newTravels)
        .then(res => {
            setTravels(prevTravels => [...prevTravels, res.data])
        })
        .catch(err => console.log(err))
  })

  const deleteTravels = ((id) => {
    axios.delete(`http://localhost:6500/delete/${id}`)
        .then(res => {
            setTravels(prevTravels => prevTravels.filter(travels => travels.id !== id))
        })
        .catch(err => console.log(err))
  })

  const editTravels = ((updates, id) => {
    axios.put(`http://localhost:6500/edit/${id}`, updates)
        .then(res => {
            setTravels(prevTravels => prevTravels.map (travels => travels.id !== id ? travels : res.data))
        })
        .catch(err => console.log(err))
  })


useEffect(() => {
      getTravels()
  }, [])


return (
    <div>
        <h1>The Wanderlust List</h1>
        <h2>The world is yours to explore</h2>
        <AddTravels 
            submit={addTravels}
            buttonText="Submit"
        />
        <h3 className="list">Your traveling wish list</h3>
      {
        travels.map(travels => 
        {
          return <Travels
            {...travels}
            id={travels.id}
            landmark={travels.landmark}
            city={travels.city}
            country={travels.country}
            hotel={travels.hotel}
            deleteTravels={deleteTravels}
            editTravels={editTravels}
          />}) 
        }
    </div>
  )
}

export default App;