import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backendData, setBackendData] = useState([{}])
  

  useEffect(() => {
      
    fetch("/api")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data)
        setBackendData(data)
      })

  }, [])  
  


  
  return (

        <div className="app_wrapper">

        {(typeof backendData.users === "undefined") ?
        
            ( <p>Loading.....</p>)
            :(backendData.users.map((user,i) =>(
              <p key={i}> {user}</p>
            )) 

          )}
        
      </div>      

   )
   
}

export default App
