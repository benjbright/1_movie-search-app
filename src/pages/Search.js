import React from "react"
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
      />
    )
  })

  return (
    <div className="container">
      <SearchBar onChange={props.onChange} onClick={props.onClick} />
      <div className="search-list-display">{displayMoviesHtml}</div>
    </div>
  )
}

export default Search
