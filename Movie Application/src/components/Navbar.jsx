import React from 'react'
import icon from "../assets/movie-icon.png"
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className='flex items-center gap-[20px] pl-[10px] py-[10px]  bg-orange-600 font-mono text-xl font-bold' >
      <img src={icon} className='w-[70px] h-auto' />
      <Link to="/" >Movies</Link>
      <Link to="/watchlist">Watchlist</Link>
    </nav>
  )
}

export default Navbar
