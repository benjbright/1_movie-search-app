import SearchBar from "../components/SearchBar"
import SearchItem from "../components/SearchItem"

const Search = (props) => {
  const data = props.movieList

  const displayMoviesHtml = data.map((movie) => {
    return (
      <SearchItem
        key={movie.id}
        movie={movie}
        addToWatchlist={props.addToWatchlist}
        watchlist={props.watchlist}
      />
    )
  })

  return (
    <div className="container">
      <SearchBar onChange={props.onChange} onClick={props.onClick} />
      {data.length === 0 && <h2>Please search for your movie!</h2>}
      {data.length > 0 && <p>Your search found {data.length} movies:</p>}
      {props.error && (
        <p>I'm sorry there has been a search error, please try again.</p>
      )}
      <div className="search-list-display">{displayMoviesHtml}</div>
    </div>
  )
}

export default Search
