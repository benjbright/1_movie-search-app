import React from "react"

const Home = ({ watchlist }) => {
  return (
    <div className="container">
      <h2>Welcome to Find your Film, the movie search App!</h2>
      <p>You have {watchlist.length} movies in your watchlist!</p>
    </div>
  )
}

export default Home
