// import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <h1>Find your Film</h1>
      <nav>
        <Link to="/">
          <h2>Search</h2>
        </Link>
        <Link to="watchlist">
          <h2>Watchlist</h2>
        </Link>
      </nav>
    </header>
  )
}

export default Header
