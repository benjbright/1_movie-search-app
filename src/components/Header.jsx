import { NavLink } from "react-router-dom"

const Header = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "white",
  }

  return (
    <header>
      <h1>Find your Film</h1>
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h2>Search</h2>
        </NavLink>
        <NavLink
          to="watchlist"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <h2>Watchlist</h2>
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
