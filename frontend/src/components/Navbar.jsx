import React from 'react'
import './Navbar.css'

const Navbar = (props) => {
  return (
    <div>
      <nav>
        <h1>{props.title}</h1>
        <ul>
            <li>🌙</li>
            <li>🔔</li>
            <li>👤</li>
            <li>{props.name}</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
