import React from 'react'
import './main.css'

const MainJoke = ({handleClick}) => {
    const clearStorage=()=>{
        localStorage.clear()
        window.location.reload()
    }
  return (
    <div className='left_card'>
     <div className="card_content">
        <h2>Dad <span>JOKES</span></h2>
        <button onClick={handleClick}>More-Jokes</button>
        <button onClick={clearStorage}>Reload</button>
     </div>
    </div>
  )
}

export default MainJoke