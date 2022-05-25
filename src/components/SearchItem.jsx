const SearchItem = ({ movie, addToWatchlist }) => {
  const poster =
    movie.poster_path != null
      ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`
      : "https://via.placeholder.com/400"

  return (
    <div className="movie-card" data-id={movie.id}>
      <img src={poster} alt="" />
      <div className="movie-display-info">
        <h3>{movie.title}</h3>
        <div className="movie-display-details">
          <p>{movie.release_date}</p>
          <p>IMDB {movie.vote_average}</p>
          <div className="add-movie">
            <i
              className="gg-add"
              data-id={movie.id}
              onClick={() => addToWatchlist(movie.id)}
            ></i>
            <p>Watchlist</p>
          </div>
        </div>
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  )
}

export default SearchItem
