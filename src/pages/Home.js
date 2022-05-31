import React from "react"

const Home = ({ watchlist }) => {
  // console.log(watchlist)

  const homePageDisplay = watchlist
    .map((movie) =>
      movie.poster_path != null
        ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`
        : "https://via.placeholder.com/400"
    )
    .map((movie, index) => <img src={movie} alt="" key={index} />)

  return (
    <div className="container">
      <h2>Welcome to Find your Film, the movie search App!</h2>
      <p>You have {watchlist.length} movies in your watchlist!</p>
      <div className="home-watchlist__container">{homePageDisplay}</div>
    </div>
  )
}

export default Home
