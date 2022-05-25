import React from "react"
import WatchlistItem from "../components/WatchlistItem"

const Watchlist = (props) => {
  const data = props.watchlist
  console.log(data)

  const checkAnyMovies = data.length === 0 ? "No movies in your watchlist" : ""

  const displayWatchlistHtml = data.map((movie) => {
    return <WatchlistItem key={movie.id} movie={movie} />
  })

  return (
    <div className="container">
      <h2>{checkAnyMovies}</h2>
      {displayWatchlistHtml}
    </div>
  )
}

export default Watchlist
