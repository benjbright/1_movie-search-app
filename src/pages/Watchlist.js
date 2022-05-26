import WatchlistItem from "../components/WatchlistItem"

const Watchlist = (props) => {
  const data = props.watchlist
  console.log(data)

  const displayWatchlistHtml = data.map((movie) => {
    return (
      <WatchlistItem
        key={movie.id}
        movie={movie}
        removeMovie={props.removeMovie}
      />
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
