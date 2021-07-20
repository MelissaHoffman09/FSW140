import {React, useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  
  const [items, setItems] = useState();

useEffect(() => {
axios.get('/getitems')
.then(res => {
  setItems(res.data);
})
.catch(err => console.log(err))
}, [])

  return (
    <div>
      <h1>The Gift Registry</h1>
      <div className="border"></div>
      <h3>Baby, Wedding and Wish List Registry for all occassions</h3>
      <div className="border"></div>

        <div className="box">
        {
          items ? 
            items.map(item => 
              <div className="box2">
              <div className="box3" style={{background: `linear-gradient(to bottom right, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.imageURL}')`}}></div>
                <h3>{item.title}</h3>
                <div className="border"></div>
                <p>{item.description}</p>
              </div>

              )
          : 
          <h3>Loading Registry List...</h3>
        }
        </div>

    </div>
  );
}

export default App;