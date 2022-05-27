import WatchlistItem from "../components/WatchlistItem"

const Watchlist = ({ watchlist, removeMovie }) => {
  const data = watchlist

  const displayWatchlistHtml = data.map((movie) => {
    return (
      <WatchlistItem key={movie.id} movie={movie} removeMovie={removeMovie} />
    )
  })

  return (
    <div className="container">
      {data.length === 0 && <h2>No movies in your watchlist!</h2>}
      {displayWatchlistHtml}
    </div>
  )
}

export default Watchlist
